import prisma from "@lib/server/prisma";

export async function getAllPostIds(){
    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    });
    const map = posts.map(({id}) => id)

    return {
        props: {
            posts,
        }
    }
}

export async function getPostData(postId){
    const thispost = prisma.post.findOne({
        where: {id: postId},
        include: {
            author: true
        }
    })
    return thispost;
}