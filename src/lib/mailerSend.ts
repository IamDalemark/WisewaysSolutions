import { MailerSend, Sender } from "mailersend";

export const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_KEY!,
});
export const domain = new Sender(
  process.env.ADMIN_EMAIl!,
  "Wiseways Solutions"
);
