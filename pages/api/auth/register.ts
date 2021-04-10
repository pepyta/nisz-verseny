import wrapper from "@lib/server/endpoint";
import prisma from "@lib/server/prisma";
import bcrypt from "bcryptjs";

export type RegistrationRequiredParameters = {
    name: string;
    email: string;
    password: string;
};

export default wrapper(async (req) => {
    const { name, password, email }: RegistrationRequiredParameters = JSON.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if(user) throw new Error("Ezzel az email címmel már regisztráltak!");

    await prisma.user.create({
        data: {
            name,
            email,
            PasswordAuthentication: {
                create: {
                    password: await bcrypt.hash(password, 12), 
                },
            },
        },
    });

    return {
        message: "Sikeres regisztráció!",
    };
});