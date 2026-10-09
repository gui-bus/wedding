import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { services } from "./firebase/admin";
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function reply(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });
}
export function failure(error: unknown) {
  if (error instanceof HttpError)
    return reply({ error: error.message }, error.status);
  if (error instanceof z.ZodError || error instanceof SyntaxError)
    return reply({ error: "Confira os dados informados." }, 400);
  return reply(
    { error: "Serviço indisponível. Tente novamente ou fale com os noivos." },
    503,
  );
}
export async function body(request: Request) {
  const text = await request.text();
  if (text.length > 32000) throw new HttpError(413, "Dados muito extensos.");
  return JSON.parse(text);
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    throw new HttpError(403, "Origem não permitida.");
}
export async function requireAdmin(request: Request) {
  sameOrigin(request);
  const bearer = request.headers
    .get("authorization")
    ?.match(/^Bearer (.+)$/)?.[1];
  if (!bearer) throw new HttpError(401, "Faça login para continuar.");
  const { auth, db } = services();
  let uid: string;
  try {
    uid = (await auth.verifyIdToken(bearer, true)).uid;
  } catch {
    throw new HttpError(401, "Sua sessão expirou. Entre novamente.");
  }
  const allowed = (process.env.FIREBASE_ADMIN_UIDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!allowed.includes(uid))
    throw new HttpError(403, "Esta conta não tem acesso ao painel.");
  return db;
}
export const tokenSchema = z.string().regex(/^[a-f0-9]{48}$/);
export const tokenId = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export const guestSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().trim().min(2).max(100),
    child: z.boolean(),
    status: z.enum(["pendente", "confirmado", "recusado"]),
    checkedIn: z.boolean(),
  })
  .strict()
  .refine(
    (g) => !g.checkedIn || g.status === "confirmado",
    "Só convidados confirmados podem ter chegada registrada.",
  );
export const inviteSchema = z
  .object({
    label: z.string().trim().min(2).max(100),
    active: z.boolean(),
    guests: z.array(guestSchema).min(1).max(40),
  })
  .strict()
  .refine(
    (i) => new Set(i.guests.map((g) => g.id)).size === i.guests.length,
    "Convidados duplicados.",
  );
export const settingsSchema = z
  .object({
    enabled: z.boolean(),
    deadline: z
      .string()
      .max(30)
      .refine(
        (s) =>
          s === "" ||
          (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s) &&
            Number.isFinite(Date.parse(s))),
      ),
  })
  .strict();
