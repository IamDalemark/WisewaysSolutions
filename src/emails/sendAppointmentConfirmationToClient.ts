import { mailerSend, domain } from "@/lib/mailerSend";
import { EmailParams, Recipient } from "mailersend";

interface sendAppointmentConfirmationToCLientProps {
  name: string;
  service: string;
  email?: string;
  date: string;
  time: string;
}

const sendAppointmentConfirmationToCLient = async ({
  service,
  name,
  date,
  time,
  email,
}: sendAppointmentConfirmationToCLientProps) => {
  console.log("working", email, name);
  const client = [new Recipient(email!, name!)];
  const utcDate = new Date(date);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options: Intl.DateTimeFormatOptions = {
    timeZone: userTimezone,
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localTime = utcDate.toLocaleString(undefined, options);
  const emailParams = new EmailParams()
    .setFrom(domain)
    .setTo(client)
    .setSubject("Wiseways Solutions")
    .setHtml(
      `<p>From  Wiseways Solutions</p>
         <p>Appointment confirmed! Here's what has been sent:</p>
         <blockquote>${service}</blockquote>
         <p>date:${localTime} ${time} (${options.timeZone})</p
         <a href="http://localhost:3000/admin/appointments</a>
         <p>— Wiseways Solutions</p>`
    )
    .setText("- Wiseways Solutions");

  await mailerSend.email.send(emailParams);
};

export default sendAppointmentConfirmationToCLient;
