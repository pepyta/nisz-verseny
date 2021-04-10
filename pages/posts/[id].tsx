import FullScreenLoader from "@components/loaders/FullScreenLoader";
import { usePosts } from "@components/providers/PostsProvider";
import Head from 'next/head'
import { useRouter } from "next/router";

export default function Post(){
    const router = useRouter();
    const id = parseInt(router.query.id+"");
    const { posts, loaded } = usePosts();

    const post = posts.find((post) => post.id === id);

    if(loaded && !post) router.push("/");
    if(!post) return (<FullScreenLoader />); 

    return (
        <>
            <section>
                {post.title}
            </section>
        </>
    )
}