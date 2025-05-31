import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/project";
import User from "@/models/user";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, name } = body;

    if (!email || !name) {
        return NextResponse.json(
            { success: false, error: "Missing email or project name." },
            { status: 400 }
        );
    }

    const uid = uuidv4();
    const data = { ...body, uid };

    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { success: false, error: "There is no account with this email." },
                { status: 400 }
            );
        }

        // Check for duplicate project name (case-insensitive)
        const existingProjects = await Project.find({ email });
        const isDuplicate = existingProjects.some(
            (proj) => proj.name.toLowerCase() === name.toLowerCase()
        );

        if (isDuplicate) {
            return NextResponse.json(
                { success: false, error: "Project with this name already exists." },
                { status: 409 }
            );
        }

        // Save the new project
        const newProject = new Project(data);
        await newProject.save();

        return NextResponse.json(
            { success: true, message: "Project successfully created." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
