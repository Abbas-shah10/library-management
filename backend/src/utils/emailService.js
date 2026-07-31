import nodemailer from "nodemailer";

const isConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);

let transporter = null;
if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    console.log(`[EMAIL DEV MODE] To: ${to} | Subject: ${subject}`);
    return { dev: true };
  }
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "LibraryMS <no-reply@libraryms.local>",
      to,
      subject,
      html,
    });
    console.log(`[EMAIL] Sent to ${to}: ${subject} (id: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error("[EMAIL] Failed to send:", error.message);
    return { error: error.message };
  }
}

const wrapHtml = (content) => `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #7c3aed, #db2777); padding: 20px 28px;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px;">📚 LibraryMS</h2>
    </div>
    <div style="padding: 28px;">
      ${content}
    </div>
    <div style="padding: 16px 28px; background: #f9fafb; color: #6b7280; font-size: 12px;">
      This is an automated message from your library management system. Please do not reply.
    </div>
  </div>
`;

export function overdueEmailTemplate({ memberName, bookTitle, dueDate }) {
  return wrapHtml(`
    <h3 style="color: #111827; margin-top: 0;">Overdue Book Reminder</h3>
    <p style="color: #374151;">Dear <strong>${memberName}</strong>,</p>
    <p style="color: #374151;">The following book is <strong style="color: #dc2626;">overdue</strong> and should be returned to the library as soon as possible:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr>
        <td style="padding: 10px; background: #f3f4f6; border-radius: 8px;"><strong>Book:</strong> ${bookTitle}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background: #f3f4f6; border-radius: 8px;"><strong>Due Date:</strong> ${dueDate}</td>
      </tr>
    </table>
    <p style="color: #374151;">Please return the book or contact the library to renew it. A fine may be charged for each day the book is late.</p>
  `);
}

export function fineEmailTemplate({ memberName, bookTitle, amount }) {
  return wrapHtml(`
    <h3 style="color: #111827; margin-top: 0;">Fine Charged</h3>
    <p style="color: #374151;">Dear <strong>${memberName}</strong>,</p>
    <p style="color: #374151;">A fine of <strong style="color: #dc2626;">$${amount}</strong> has been charged to your account for the overdue book:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr>
        <td style="padding: 10px; background: #f3f4f6; border-radius: 8px;"><strong>Book:</strong> ${bookTitle}</td>
      </tr>
    </table>
    <p style="color: #374151;">Please pay the fine at the library counter or online at your earliest convenience.</p>
  `);
}

export function reservationEmailTemplate({ memberName, bookTitle }) {
  return wrapHtml(`
    <h3 style="color: #111827; margin-top: 0;">Reservation Fulfilled</h3>
    <p style="color: #374151;">Dear <strong>${memberName}</strong>,</p>
    <p style="color: #374151;">Good news! The book you reserved is now available:</p>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
      <tr>
        <td style="padding: 10px; background: #f3f4f6; border-radius: 8px;"><strong>Book:</strong> ${bookTitle}</td>
      </tr>
    </table>
    <p style="color: #374151;">Please visit the library to collect it within the next 7 days.</p>
  `);
}
