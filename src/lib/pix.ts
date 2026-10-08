/**
 * Gerador de Payload PIX Padrão BACEN / EMVCo
 * Gera a string "PIX Copia e Cola" oficial e sem dependência de intermediários
 */

interface PixPayloadParams {
  pixKey: string;
  receiverName: string;
  city: string;
  amount?: number;
  description?: string;
  txId?: string;
}

// Remove acentos e caracteres especiais para compatibilidade bancária
function sanitizeText(text: string, maxLength: number): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .slice(0, maxLength);
}

// Formata cada campo no padrão EMVCo (ID + Tamanho 2 dígitos + Valor)
function formatEMVField(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

// Calcula o CRC16-CCITT (Polinômio 0x1021, valor inicial 0xFFFF)
function calculateCRC16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixPayload({
  pixKey,
  receiverName,
  city,
  amount,
  description = "Presente de Casamento",
  txId = "***",
}: PixPayloadParams): string {
  const cleanKey = pixKey.trim();
  const cleanName = sanitizeText(receiverName, 25) || "NOIVOS";
  const cleanCity = sanitizeText(city, 15) || "BRASIL";
  const cleanDesc = sanitizeText(description, 25);
  const cleanTxId = sanitizeText(txId, 25) || "***";

  // Subcampos da conta do comerciante (ID 26)
  const guiField = formatEMVField("00", "br.gov.bcb.pix");
  const keyField = formatEMVField("01", cleanKey);
  const descField = cleanDesc ? formatEMVField("02", cleanDesc) : "";
  const merchantAccountInfo = formatEMVField("26", `${guiField}${keyField}${descField}`);

  // Subcampo de dados adicionais (ID 62)
  const txIdField = formatEMVField("05", cleanTxId);
  const additionalDataField = formatEMVField("62", txIdField);

  // Montagem do payload EMVCo base
  let payload = [
    formatEMVField("00", "01"), // Payload Format Indicator
    formatEMVField("01", "12"), // Point of Initiation (12 = Dinâmico/Estático reutilizável)
    merchantAccountInfo,        // Merchant Account Information (PIX)
    formatEMVField("52", "0000"), // Merchant Category Code
    formatEMVField("53", "986"),  // Transaction Currency (986 = BRL)
  ].join("");

  if (amount && amount > 0) {
    const formattedAmount = amount.toFixed(2);
    payload += formatEMVField("54", formattedAmount); // Transaction Amount
  }

  payload += [
    formatEMVField("58", "BR"),        // Country Code
    formatEMVField("59", cleanName),    // Merchant Name
    formatEMVField("60", cleanCity),    // Merchant City
    additionalDataField,                // Additional Data Field Template
    "6304",                             // CRC16 header
  ].join("");

  const crc = calculateCRC16(payload);
  return `${payload}${crc}`;
}
