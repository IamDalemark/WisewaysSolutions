import { mailerSend, domain } from "@/lib/mailerSend";
import { EmailParams, Recipient } from "mailersend";

interface sendTestimonialEmailToAdminProps {
  testimonial_id: string;
  name: string;
  testimonial: string;
  rating: string;
  email?: string;
}

const sendTestimonialEmailToAdmin = async ({
  testimonial_id,
  name,
  testimonial,
  rating,
  email,
}: sendTestimonialEmailToAdminProps) => {
  const admin = [new Recipient("danielweg123@gmail.com", "wiegand")];

  const emailParams = new EmailParams()
    .setFrom(domain)
    .setTo(admin)
    .setSubject(`New testimonial from ${name}`)
    .setHtml(
      `<p>From ${name}, ${email}</p>
         <p>Please review! Here's what has been sent:</p>
         <blockquote>${testimonial}</blockquote>
         <p>Rating: ${rating}/5</p
         <a href="http://localhost:3000/api/testimonials?testimonial_id=${testimonial_id}&is_approved=Accepted" ...>Accept</a>
         <a href="http://localhost:3000/api/testimonials?testimonial_id=${testimonial_id}&is_approved=Declined" ...>Decline</a>
         <p>— Wiseways Solutions</p>`
    )
    .setText("- Wiseways Solutions");

  await mailerSend.email.send(emailParams);
};

export default sendTestimonialEmailToAdmin;
