# Giovanna & Edson
Site adaptado da referência clever-pythagoras. Casamento em 29/05/2027 às 11h30, Quintal & Cia, Rua dos Marceneiros 210, Jardim Valparaíba, São José dos Campos/SP.

## Executar
npm install
npm run dev

Validação: npx tsc --noEmit, npm run lint, npm run build.

## Conteúdo
Configuração em src/config/wedding.config.ts. Paleta solicitada, história desde 2016 e fotografias de alianças, flores, mesas, decoração e paisagens inspecionadas, sem pessoas. Imagens de decoração são ilustrativas, não fotografias do Quintal & Cia. O design usa a referência como base, com foco tipográfico e movimento cinematográfico: entrada dos nomes em máscaras, palavras reveladas com a rolagem, parallax das imagens, uma passagem verde oliva com a data em escala progressiva, entradas de títulos com desfoque suave e blocos em sequência. Presentes, paleta e botões têm efeitos sutis de interação. A galeria está desativada e não aparece no menu. As animações GSAP respeitam prefers-reduced-motion e não prendem a rolagem. O fundo principal é #F1F1F1, o layout usa max-w-440 mx-auto (1760px) e as seções têm altura natural, sem altura mínima de viewport. O traje, o cronograma detalhado da recepção, o estacionamento e o prazo de RSVP não foram informados e não são apresentados como fatos.

## Presentes e cartão
O catálogo importado está em src/config/gifts.json: 32 itens contendo apenas name, category e url. A origem informa 87 itens, mas só 32 foram enviados. Preços não foram importados. As fotos foram inspecionadas; quatro com pessoas ou mãos são substituídas por uma fotografia ilustrativa de alianças na interface, preservando a URL original no JSON.
Recomendação: criar um link de pagamento no Mercado Pago para cada presente, na conta de quem receberá o dinheiro. Depois de definir os valores, acrescentar price e creditCardUrl no mapeamento de gifts em src/config/wedding.config.ts para cada item. O catálogo bruto permanece com os três campos solicitados.
Não adicionar tokens secretos no frontend. Conferir titular, valor, taxas e parcelamento em uma compra de teste antes de divulgar.
Para cota livre, creditCard.defaultPaymentLink deve permitir que o convidado informe o valor. O site não altera o valor desse link.
Não usar o mesmo link de valor fixo para presentes com preços diferentes.
O checkout confirma os pagamentos; abrir o link não comprova recebimento. Para confirmação automática e controle de cotas, será necessária integração de checkout com backend e webhooks.
Links de cartão e chave PIX estão vazios de propósito até receber os dados reais. Não há cobrança fictícia nem promessa de parcelamento em 12x.
PIX: preencher pix.key, receiverName e city com os dados reais do titular.

## Confirmação de presença e administração
Firebase Authentication e Firestore no plano Spark. Painel em /admin e confirmação em /rsvp, com códigos exclusivos por convite. Configuração inicial, segurança, uso e testes em [docs/COMO-USAR.md](docs/COMO-USAR.md). A integração antiga com Google Apps Script foi substituída; não configure RSVP_GOOGLE_APPS_SCRIPT_URL.

## Publicação
Projeto Next.js com rota de servidor: usar hospedagem compatível com Node/Next.js, como Vercel. Nenhuma publicação foi realizada.
A branch de trabalho e de produção é main. Na integração Git da Vercel, configurar Production Branch como main para publicar os novos commits dessa branch.
