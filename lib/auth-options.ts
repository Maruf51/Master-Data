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
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};

                if (!email || !password) throw new Error("Missing credentials");

                await connectMongoDB();
                const user = await User.findOne({ email, password });

                if (!user) throw new Error("Invalid email or password");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
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
        async jwt({ token, account, profile, trigger, session }) {
            await connectMongoDB();

            // Google login
            if (account?.provider === "google" && profile?.email) {
                const picture = (profile as { picture?: string })?.picture;
                let user = await User.findOne({ email: profile.email });

                if (!user) {
                    user = await User.create({
                        name: profile.name,
                        email: profile.email,
                        image: picture,
                        auth: "google",
                    });
                }

                token.id = user._id.toString();
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
            }

            // Manual trigger to refresh session
            if (trigger === "update" && session?.email) {
                const user = await User.findOne({ email: session.email });
                if (user) {
                    token.name = user.name;
                    token.image = user.image;
                }
            }

            return token;
        },

        async session({ session, token }: any) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            session.user.image = token.image as string;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
