import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Post, Comment } from "@/models/post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface PostsState {
  posts: Post[];
  postSelected: Post | null;
  comments: Comment[];
  fetchPosts: () => void;
  getPostsCount: () => number;
  clearPosts: () => void;
  setPostSelected: (postSelected: Post) => void;
  fetchCommentsByPost: (postId: number) => void;
  getCommentsCount: () => number;
  clearComments: () => void;
}

const usePostsStore = create(
  persist<PostsState>(
    (set, get) => ({
      posts: [],

      postSelected: null,

      comments: [],

      fetchPosts: async () => {
        try {
          const response = await axios.get(`${BASE_URL}/posts`);
          set({ posts: response.data });
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      },

      getPostsCount: () => get().posts.length,

      clearPosts: () => set({ posts: [] }),

      setPostSelected: (postSelected: Post) => set({ postSelected }),

      fetchCommentsByPost: async (postId: number) => {
        try {
          const response = await axios.get(
            `${BASE_URL}/posts/${postId}/comments`
          );
          set({ comments: response.data });
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      },

      getCommentsCount: () => get().comments.length,

      clearComments: () => set({ comments: [] }),
    }),
    {
      name: "posts-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePostsStore;
