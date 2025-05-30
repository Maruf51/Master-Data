import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { havePassword, newPassword, oldPassword, email } = body;

    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch the user from the database by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        if (havePassword) {
            if (!newPassword || !oldPassword) {
                return NextResponse.json({ error: "Both newPassword and oldPassword are required." }, { status: 400 });
            }

            // Check if the old password matches
            if (user.password !== oldPassword) {
                return NextResponse.json({ error: "Old password does not match." }, { status: 400 });
            }

            // Ensure the new password is not the same as the old password
            if (newPassword === oldPassword) {
                return NextResponse.json({ error: "New password cannot be the same as the old password." }, { status: 400 });
            }

            // Update the password in the database
            user.password = newPassword;
            await user.save();

            return NextResponse.json({ message: "Password updated." });
        } else {
            if (!newPassword) {
                return NextResponse.json({ error: "Password is required." }, { status: 400 });
            }

            // Update the password in the database
            user.password = newPassword;
            await user.save();

            return NextResponse.json({ message: "Password added." });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
