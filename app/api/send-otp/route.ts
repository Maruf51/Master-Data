import { saveOTP } from "@/lib/otp-store";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        saveOTP(email, otp);

        // Store OTP in memory or database — temporary (e.g., Redis)
        // For now, we just log it (not secure for production)
        console.log(`OTP for ${email}: ${otp}`);

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, // your Gmail
                pass: process.env.EMAIL_PASS, // your App Password
            },
        });

        const mailOptions = {
            from: `"Boiler PLate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `<p>Your one-time password (OTP - valid for 5 minutes) for Boiler Plate is: <br/> <strong style="font-size: 24px; font-weight: bold;">${otp}</strong></p>`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "OTP sent successfully." });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
    }
}
