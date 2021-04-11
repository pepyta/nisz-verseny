import prisma from "@lib/server/prisma";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";

export default NextAuth({
    session: {
        jwt: true,
    },
    jwt: {
        signingKey: `{"kty":"oct","kid":"Dl893BEV-iVE-x9EC52TDmlJUgGm9oZ99_ZL025Hc5Q","alg":"HS512","k":"K7QqRmJOKRK2qcCKV_pi9PSBv3XP0fpTu30TP8xn4w01xR3ZMZM38yL2DnTVPVw6e4yhdh0jtoah-i4c_pZagA"}`,
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
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