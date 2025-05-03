import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "./mongodb";
import User from "@/models/user";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials || {};

                try {
                    if (!credentials || !email || !password) {
                        throw new Error("Missing credentials");
                    }

                    await connectMongoDB();
                    const user = await User.findOne({ email, password });

                    if (user) {
                        return { id: user._id.toString(), name: user.name, email: user.email, image: user?.image };
                    } else {
                        throw new Error("Email or password is invalid");
                    }
                } catch (error) {
                    throw new Error("Email or password is invalid");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            // If this is a Google sign-in
            if (account?.provider === "google") {
                await connectMongoDB();
                console.log(profile)

                // Check if the user exists in the database
                let user = await User.findOne({ email: profile?.email });

                if (!user) {
                    // If the user doesn't exist, create a new user
                    user = await User.create({
                        name: profile?.name,
                        email: profile?.email,
                        image: (profile as { picture?: string })?.picture,
                        auth: "google"
                    });
                } else {
                    await user.save();
                }

                // Add custom fields to the token
                token.id = user._id.toString();
                token.status = user.status;
            }

            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};