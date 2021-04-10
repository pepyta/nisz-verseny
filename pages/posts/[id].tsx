import prisma from "@lib/server/prisma";
import { getAllPostIds, getPostData } from "../../lib/server/posts"
/*
export async function getStaticProps({  }){
    const postData = getPostData()
    return{
        props: {
            postData
        }
    }
}
export async function getStaticPaths(){
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}
*/
export default function Post({ postData }){
    return (
        <>
            {postData.title}
        </>
    )
}