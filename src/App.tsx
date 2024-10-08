import "./App.css";

import { usePostStore, useUserStore } from "./store";

import { useState } from "react";

function UpdateUserForm() {
    const { username, email, setUsername, setEmail } = useUserStore();

    return (
        <form>
            <div>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        </form>
    );
}

function App() {
    const { username, email, setUsername, setEmail } = useUserStore();
    const { posts, addPost, deletePost } = usePostStore();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [postID, setPostID] = useState<number>(1);

    return (
        <>
            <div>{username}</div>
            <div>{email}</div>
            <UpdateUserForm />
            <div>
                <div>
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="content"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </div>
                <div>
                    <button
                        onClick={() => {
                            addPost({ title, content, id: postID });
                            setPostID((prev) => prev + 1);
                            setTitle("");
                            setContent("");
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div>
                <h1>Posts</h1>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <div>
                            <button
                                onClick={() => {
                                    deletePost(post.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
