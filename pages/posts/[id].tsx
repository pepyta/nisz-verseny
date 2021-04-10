import prisma from "@lib/server/prisma";
import Head from 'next/head'

export async function getStaticProps({ params }){
    const postData = await prisma.post.findOne({
        where: {id: params.id},
        include: { author: true}
    });
    return{
        props: {
            postData
        }
    }
}
export async function getStaticPaths(){
    const posts = await prisma.post.findMany({
        include: {author: true},
    });

    return {
        paths: posts.map((post) => ({
            params: {
                id: post.id.toString()
            }
        })),
        fallback: false
    };
}

export default function Post( { postData } ){
    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <section>
                Szia helo
            </section>
        </>
    )
}