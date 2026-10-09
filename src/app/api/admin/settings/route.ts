import {
  body,
  failure,
  reply,
  requireAdmin,
  settingsSchema,
} from "@/lib/guest-server";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const db = await requireAdmin(request);
    const snap = await db.doc("settings/rsvp").get();
    return reply({ settings: snap.data() ?? { enabled: true, deadline: "" } });
  } catch (e) {
    return failure(e);
  }
}
export async function PUT(request: Request) {
  try {
    const db = await requireAdmin(request);
    const data = settingsSchema.parse(await body(request));
    await db.doc("settings/rsvp").set(data);
    return reply({ success: true });
  } catch (e) {
    return failure(e);
  }
}
