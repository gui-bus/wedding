/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - INTEGRAÇÃO RSVP COM GOOGLE SHEETS
 * =========================================================================
 *
 * COMO CONFIGURAR EM 1 MINUTO:
 * 1. Abra uma nova Planilha no Google Sheets (ex: "RSVP - Casamento Giovanna e Edson").
 * 2. No menu superior, clique em "Extensões" > "Apps Script".
 * 3. Apague qualquer código existente no editor e cole todo este arquivo.
 * 4. Clique no ícone de disquete (Salvar).
 * 5. No canto superior direito, clique em "Implantar" (Deploy) > "Nova implantação".
 * 6. Em "Selecionar tipo", clique na engrenagem e escolha "App da Web" (Web app).
 * 7. Preencha:
 *    - Descrição: "RSVP Casamento"
 *    - Executar como: "Eu" (seu e-mail)
 *    - Quem pode acessar: "Qualquer pessoa" (Anyone) -> IMPORTANTE!
 * 8. Clique em "Implantar", autorize o acesso com sua conta Google e copie o "URL do app da Web".
 * 9. Cole essa URL no arquivo `src/config/wedding.config.ts` no campo `rsvp.googleAppsScriptUrl`.
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se a planilha estiver vazia, cria os cabeçalhos formatados
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Data/Hora do Envio",
        "Nome do Convidado Principal",
        "WhatsApp / Telefone",
        "Presença Confirmada",
        "Qtd Acompanhantes",
        "Nomes dos Acompanhantes",
        "Restrições Alimentares",
        "Recado para os Noivos"
      ];
      sheet.appendRow(headers);

      // Estilização do cabeçalho
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#2D3748");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
    var fullName = data.fullName || "";
    var whatsapp = data.whatsapp || "";
    var attending = data.attending === "sim" ? "SIM ✅" : "NÃO ❌";

    var companionsList = "";
    var companionCount = 0;

    if (data.companions && Array.isArray(data.companions)) {
      var validNames = data.companions
        .map(function(c) { return c.name ? c.name.trim() : ""; })
        .filter(function(name) { return name.length > 0; });

      companionCount = validNames.length;
      companionsList = validNames.join(", ");
    }

    var dietary = data.dietaryRestrictions || "Nenhuma";
    var message = data.message || "";

    // Adiciona a linha na planilha
    sheet.appendRow([
      timestamp,
      fullName,
      whatsapp,
      attending,
      companionCount,
      companionsList,
      dietary,
      message
    ]);

    // Formata largura das colunas automaticamente
    for (var i = 1; i <= 8; i++) {
      sheet.autoResizeColumn(i);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Presença registrada com sucesso!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online", message: "RSVP Google Sheets Web App está ativo!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
