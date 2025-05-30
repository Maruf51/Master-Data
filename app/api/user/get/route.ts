import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ success: false, error: "Email query parameter is required." }, { status: 400 });
    }

    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Find the user by email
        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
        }

        // Return the auth field
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching user:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}