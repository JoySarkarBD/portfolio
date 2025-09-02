import { NextResponse } from "next/server";
import SendEmail from "../../../../utils/email/send-email";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string | Record<string, string | undefined>;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, message }: ContactForm = await request.json();

    // ✅ Input validation
    if (!name || !email || !message) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: {
            name: !name ? "Name is required." : undefined,
            email: !email ? "Email is required." : undefined,
            message: !message ? "Message is required." : undefined,
          },
        },
        { status: 400 }
      );
    }

    // ✅ Build email contents
    const subject = `New Contact Form Submission from ${name}`;
    const text = `
Name: ${name}
Email: ${email}
Message: ${message}
`;

    const html = `
  <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <div style="background:#4f46e5; padding:16px; text-align:center;">
        <h2 style="margin:0; font-size:20px; color:#ffffff;">📩 New Contact Form Submission</h2>
      </div>
      <div style="padding:24px;">
        <p style="font-size:16px; color:#333; margin:0 0 12px;">
          <strong>Name:</strong> ${name}
        </p>
        <p style="font-size:16px; color:#333; margin:0 0 12px;">
          <strong>Email:</strong> <a href="mailto:${email}" style="color:#4f46e5; text-decoration:none;">${email}</a>
        </p>
        <p style="font-size:16px; color:#333; margin:0 0 12px;">
          <strong>Message:</strong>
        </p>
        <div style="padding:12px; border:1px solid #e5e7eb; border-radius:6px; background:#f3f4f6; font-size:15px; color:#111;">
          ${message}
        </div>
      </div>
      <div style="background:#f3f4f6; padding:12px; text-align:center; font-size:13px; color:#6b7280;">
        This message was sent via your website contact form.
      </div>
    </div>
  </div>
`;

    // ✅ Send the email
    const emailSent = await SendEmail({
      to: process.env.EMAIL_USER as string,
      text,
      subject,
      html,
    });

    if (!emailSent) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Failed to send email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Email sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to process request.",
        error: error?.toString(),
      },
      { status: 500 }
    );
  }
}
