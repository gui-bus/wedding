import { z } from "zod";
import { services } from "@/lib/firebase/admin";
import {
  body,
  failure,
  HttpError,
  reply,
  sameOrigin,
  tokenId,
  tokenSchema,
} from "@/lib/guest-server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const { token } = z
      .object({ token: tokenSchema })
      .parse(await body(request));
    const { db } = services();
    const [snap, settings] = await Promise.all([
      db.collection("invitations").doc(tokenId(token)).get(),
      db.doc("settings/rsvp").get(),
    ]);
    const data = snap.data();
    if (!data || !data.active)
      throw new HttpError(
        404,
        "Convite não encontrado. Confira o código ou fale com os noivos.",
      );
    const config = settings.data() ?? { enabled: true, deadline: "" };
    return reply({
      invitation: {
        label: data.label,
        guests: data.guests.map(
          (g: { id: string; name: string; status: string }) => ({
            id: g.id,
            name: g.name,
            status: g.status,
          }),
        ),
        revision: data.revision,
        respondedAt: data.respondedAt,
        message: data.message,
        dietaryRestrictions: data.dietaryRestrictions,
      },
      settings: config,
    });
  } catch (e) {
    if (e instanceof z.ZodError) return reply({error:"Código de convite inválido. Copie os 48 caracteres do código enviado pelos noivos ou abra o link que você recebeu."},400);
    return failure(e);
  }
}
