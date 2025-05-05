import { mailerSend, domain } from "@/lib/mailerSend";
import { EmailParams, Recipient } from "mailersend";

interface sendAppointmentEmailToAdminProps {
  name: string;
  service: string;
  email?: string;
  date: string;
  time: string;
}

const sendAppointmentEmailToAdmin = async ({
  service,
  name,
  date,
  time,
  email,
}: sendAppointmentEmailToAdminProps) => {
  const admin = [new Recipient("danielweg123@gmail.com", "wiegand")];
  const utcDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localPHTime = utcDate.toLocaleString("en-PH", options);
  const emailParams = new EmailParams()
    .setFrom(domain)
    .setTo(admin)
    .setSubject(`${name} Booked!`)
    .setHtml(
      `<p>From ${name}, ${email}</p>
         <p>Appointment booked! Here's what has been sent:</p>
         <blockquote>${service}</blockquote>
         <p>date:${localPHTime} ${time} (${options.timeZone})</p
         <a href="http://localhost:3000/admin/appointments</a>
         <p>— Wiseways Solutions</p>`
    )
    .setText("- Wiseways Solutions");

  await mailerSend.email.send(emailParams);
};

export default sendAppointmentEmailToAdmin;
