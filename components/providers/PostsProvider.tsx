import PostsWrapper from "@lib/client/wrapper/posts";
import { GetPostsResponseType } from "@pages/api/posts/get";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";

type PostsContextType = {
    posts: GetPostsResponseType;
    setPosts: Dispatch<SetStateAction<GetPostsResponseType>>;
    loaded: boolean;
};

const PostsContext = createContext<PostsContextType>(null);

export const usePosts = () => {
    const {posts, setPosts, loaded } = useContext(PostsContext);

    return {
        posts,
        loaded,
        addPost: (post: GetPostsResponseType[0]) => setPosts([post, ...posts]),
        removePost: (id: number) => setPosts([...posts].filter((el) => el.id !== id)),
    }
};

const PostsProvider = ({ children }: PropsWithChildren<{}>) => {
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState<GetPostsResponseType>([]);

    const wrapper = new PostsWrapper();

    const load = async () => {
        try {
            const resp = await wrapper.get();
        
            setPosts(resp.data);
            setLoaded(true);
        } catch(e) {}
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <PostsContext.Provider value={{ posts, loaded, setPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;