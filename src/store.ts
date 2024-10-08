import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface UserStore {
    username: string;
    email: string;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
}
export const useUserStore = create(
    devtools<UserStore>(
        (set) => ({
            username: "Danny",
            email: "danny.hobby",
            setUsername: (username: string) =>
                set(() => ({
                    username,
                })),
            setEmail: (email: string) =>
                set(() => ({
                    email,
                })),
        }),
        { name: "user", store: "user" }
    )
);

export interface Post {
    id: number;
    title: string;
    content: string;
}

export interface PostStore {
    posts: Post[];
    setPosts: (posts: Post[]) => void;
    addPost: (post: Post) => void;
    deletePost: (id: number) => void;
}

export const usePostStore = create(
    devtools(
        immer<PostStore>((set) => ({
            posts: [{ id: 0, title: "Hello World", content: "Lorem" }],
            setPosts: (posts: Post[]) => set(() => ({ posts })),
            addPost: (post: Post) =>
                set((state) => {
                    state.posts.push(post);
                }),
            deletePost: (id: number) =>
                set((state) => {
                    const index = state.posts.findIndex(
                        (post) => post.id === id
                    );
                    if (index !== -1) {
                        state.posts.splice(index, 1);
                    }
                }),
        })),
        { name: "posts", store: "posts" }
    )
);

// export const usePostStore = create(
//     devtools(
//         immer<PostStore>((set) => ({
//             posts: [{ id: 0, title: "Hello World", content: "Lorem" }],
//             setPosts: (posts: Post[]) => set(() => ({ posts })),
//             addPost: (post: Post) =>
//                 set((state) => ({ posts: [...state.posts, post] })),
//             deletePost: (id: number) =>
//                 set((state) => ({
//                     posts: state.posts.filter((post: Post) => post.id !== id),
//                 })),
//         })),
//         { name: "posts", store: "posts" }
//     )
// );

// export interface UserSlice {
//     username: string;
//     email: string;
//     setUsername: (username: string) => void;
//     setEmail: (email: string) => void;
// }

// export const createUserSlice: StateCreator<UserSlice> = (set) => ({
//     username: "Danny",
//     email: "danny.hobby",
//     setUsername: (username: string) =>
//         set(() => ({
//             username,
//         })),
//     setEmail: (email: string) =>
//         set(() => ({
//             email,
//         })),
// });

// export const useAppStore = create(
//     devtools<UserSlice>((...a) => ({
//         ...createUserSlice(...a),
//     }))
// );

// export const useAppStore = create<UserSlice>((...a) => ({
//     ...createUserSlice(...a),
// }));
