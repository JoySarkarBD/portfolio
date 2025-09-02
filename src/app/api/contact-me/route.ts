// Simple in-memory rate limiter (per IP)
const rateLimitWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 1;
const ipRequestMap = new Map<string, { count: number; firstRequest: number }>();
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
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  let entry = ipRequestMap.get(ip);
  if (!entry || now - entry.firstRequest > rateLimitWindowMs) {
    // New window
    entry = { count: 1, firstRequest: now };
    ipRequestMap.set(ip, entry);
  } else {
    entry.count++;
    if (entry.count > maxRequestsPerWindow) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: `Too many requests. Please try again later.`,
        },
        { status: 429 }
      );
    }
  }
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
  
<div style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; background-color: #f6f7f8; padding: 30px 15px;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
    <div style="background: #0a2b4e; padding: 20px; text-align: left;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: 0.3px;">
        Contact Form Submission
      </h2>
    </div>
    <div style="padding: 25px 20px;">
      <p style="font-size: 15px; color: #1a202c; margin: 0 0 12px; line-height: 1.6; font-weight: 400;">
        <strong style="color: #111827; font-weight: 600;">Name:</strong> ${name}
      </p>
      <p style="font-size: 15px; color: #1a202c; margin: 0 0 12px; line-height: 1.6; font-weight: 400;">
        <strong style="color: #111827; font-weight: 600;">Email:</strong> 
        <a href="mailto:${email}" style="color: #1e40af; text-decoration: none; font-weight: 500;">${email}</a>
      </p>
      <p style="font-size: 15px; color: #1a202c; margin: 0 0 12px; line-height: 1.6; font-weight: 400;">
        <strong style="color: #111827; font-weight: 600;">Message:</strong>
      </p>
      <div style="padding: 14px; border-left: 3px solid #e2e8f0; background: #fafafa; font-size: 14px; color: #1a202c; line-height: 1.65;">
        ${message}
      </div>
    </div>
    <div style="background: #f9fafb; padding: 12px 20px; text-align: center; font-size: 12px; color: #4b5563; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-weight: 400;">Received via website contact form</p>
      <p style="margin: 4px 0 0;">
        <a href="https://yourwebsite.com" style="color: #1e40af; text-decoration: none; font-weight: 500;">yourwebsite.com</a>
      </p>
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
