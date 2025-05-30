import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: NextRequest) {
    try {
        const { email, name, image } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Ensure at least one of name or image is provided
        if (!name && !image) {
            return NextResponse.json({ error: "At least one of name or image must be provided" }, { status: 400 });
        }

        await connectMongoDB();

        const updateFields: Record<string, any> = {};
        if (name) updateFields.name = name;
        if (image) updateFields.image = image;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
