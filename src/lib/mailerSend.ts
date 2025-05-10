import { MailerSend, Sender } from "mailersend";

export const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_KEY!,
});
export const domain = new Sender(
  "wisewayssolutions@test-xkjn41mm6zp4z781.mlsender.net",
  "Wiseways Solutions"
);
