import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Check if the user already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json({ error: "Email is already used." }, { status: 400 });
        }

        // Create a new user
        const newUser = new User(body); // Create a new instance of the User model
        await newUser.save(); // Save the user to the database

        return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
    } catch (error) {
        console.error("Error connecting to MongoDB or registering user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}