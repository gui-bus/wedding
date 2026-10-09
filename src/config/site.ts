export const SITE_URL = "https://giovannaeedson.magui.studio";

export function invitationUrl(token: string) {
  return SITE_URL + "/rsvp#" + token;
}
