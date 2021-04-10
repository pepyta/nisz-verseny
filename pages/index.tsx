import { useSession } from "next-auth/client"

export default function Home() {
    const [session] = useSession();
    console.log(session);

    return (
        <div>
            Szia Lajos!
        </div>
    )
}
