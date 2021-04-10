import { useSession } from "next-auth/client"

export default function Home() {
    const [session, loading] = useSession();

    return (
        <div>
            Szia Lajos!
        </div>
    )
}
