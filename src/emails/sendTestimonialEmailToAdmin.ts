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
      `<div
      style="
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #333;
        background-color: #f0f0f0;
      "
    >
      <p>
        <strong>From:</strong> <span style="color: teal">${name}</span>
        <span style="color: teal">&lt;${email}&gt;</span>
      </p>
      <p>Please review the testimonial below:</p>
      <blockquote
        style="
          margin: 16px 0;
          padding: 12px;
          background-color: #f9f9f9;
          border-left: 4px solid #ccc;
        "
      >
        ${testimonial}
      </blockquote>
      <p>
        <strong>Rating:</strong> <span style="color: teal">${rating} / 5</span>
      </p>
      <div style="margin: 24px 0">
        <a
          href="http://localhost:3000/api/testimonials?testimonial_id=${testimonial_id}&is_approved=Accepted"
          style="
            display: inline-block;
            padding: 10px 16px;
            margin-right: 12px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 4px;
          "
        >
          Accept
        </a>
        <a
          href="http://localhost:3000/api/testimonials?testimonial_id=${testimonial_id}&is_approved=Declined"
          style="
            display: inline-block;
            padding: 10px 16px;
            background-color: #dc3545;
            color: white;
            text-decoration: none;
            border-radius: 4px;
          "
        >
          Decline
        </a>
      </div>

      <p style="color: #666">— Wiseways Solutions</p>
    </div>`
    )
    .setText("- Wiseways Solutions");

  await mailerSend.email.send(emailParams);
};

export default sendTestimonialEmailToAdmin;
