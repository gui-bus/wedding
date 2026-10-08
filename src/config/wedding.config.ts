import giftCatalog from "./gifts.json";
import { WeddingConfig } from "@/types/wedding";

export const weddingConfig: WeddingConfig = {
  couple: {
    partner1: "Giovanna",
    partner2: "Edson",
    headline: "Vamos nos casar e queremos celebrar esse momento com você!",
    weddingDate: "2027-05-29T11:30:00-03:00",
    locationSummary: "São José dos Campos - SP",
    hashtag: "#CasamentoGiovannaeEdson",
    coverImage: "/casal/festa-de-casamento.png",
    story: {
      enabled: true,
      title: "Do primeiro encontro ao nosso grande ‘sim’.",
      text: [
        "Nossa história começou em 2016, quando a vida nos colocou no mesmo caminho. Desde então, entre encontros, desafios, conquistas e muitos momentos compartilhados, fomos construindo uma vida juntos.",
        "Hoje, depois de tantos capítulos vividos lado a lado, chegamos ao momento de celebrar o nosso amor e dizer, mais uma vez, sim um ao outro.",
        "E agora, diante das pessoas que amamos, damos início ao capítulo mais bonito da nossa história: o nosso para sempre.",
      ],
      image: "/casal/aliancas-que-selam-nossa-promessa.png",
    },
  },

  gallery: [
    { id: "rings", url: "/casal/aliancas-que-selam-nossa-promessa.png", caption: "O símbolo de um novo capítulo", aspect: "wide" },
    { id: "garden", url: "/casal/festa-de-casamento.png", caption: "Flores e luz para celebrar", aspect: "wide" },
  ],
  ceremony: {
    title: "Cerimônia & Recepção", subtitle: "Nosso grande ‘sim’", time: "11h30",
    placeName: "Quintal e Cia", address: "Rua dos Marceneiros, 210 - Jardim Valparaíba",
    cityState: "São José dos Campos - SP",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Quintal+e+Cia+Rua+dos+Marceneiros+210+Jardim+Valparaiba+Sao+Jose+dos+Campos",
    wazeUrl: "https://waze.com/ul?q=Rua%20dos%20Marceneiros%20210%20Sao%20Jose%20dos%20Campos&navigate=yes",
    tips: "A cerimônia e a recepção acontecerão no mesmo local.",
  },
  party: {
    title: "Recepção", subtitle: "Após a cerimônia", time: "Após a cerimônia",
    placeName: "Quintal e Cia", address: "Rua dos Marceneiros, 210 - Jardim Valparaíba",
    cityState: "São José dos Campos - SP",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Quintal+e+Cia+Rua+dos+Marceneiros+210",
  },

  dressCode: {
    title: "Guia de Trajes & Dress Code",
    description: "A paleta da nossa celebração, inspirada na natureza.",
    palette: [
      { name: "Areia Dourada & Linho", hex: "#C7B79D" },
      { name: "Terracota & Marrom Quente", hex: "#80654E" },
      { name: "Café Profundo & Madeira", hex: "#3D2501" },
      { name: "Verde Oliva Botânico", hex: "#5D613C" },
      { name: "Marfim Suave & Baunilha", hex: "#F5F5DA" },
      { name: "Alabastro / Off-White", hex: "#F1F1F1" },
    ],
    dos: [], donts: [],
    gallery: [],
  },

  gifts: giftCatalog.map((item, index) => ({
    id: String(index + 1), title: item.name, category: item.category,
    categoryLabel: item.category, image: item.url,
  })),
  pix: {
    key: "",
    keyType: "email",
    receiverName: "Giovanna e Edson",
    city: "SAO JOSE DOS CAMPOS",
    whatsappConfirmationPhone: "",
  },

  creditCard: {
    enabled: true,
    defaultPaymentLink: "",
    providerName: "Mercado Pago",
    installmentsInfo: "Parcelamento conforme as condições do checkout.",
  },

  rsvp: {
    googleAppsScriptUrl:
      "",

    contactWhatsApp: "",
  },
};
