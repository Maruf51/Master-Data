import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp-store"; // adjust path if necessary

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, otp } = body;

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
        }

        const valid = verifyOTP(email, otp);

        if (!valid) {
            return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
        }

        return NextResponse.json({ message: "OTP verified successfully." });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Failed to verify OTP." }, { status: 500 });
    }
}
