import prisma from "@lib/server/prisma";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async ({ email, password }) => {
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                    include: {
                        PasswordAuthentication: true,
                    }
                });

                if(!user) return null;
                if(!await bcrypt.compare(password, user.PasswordAuthentication.password)) return null;

                return user;
            },
        }),
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
});