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
  counterDetailViews: number;
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  getPostsCount: () => number;
  clearPosts: () => void;
  setPostSelected: (postSelected: Post) => void;
  fetchCommentsByPost: (postId: number) => Promise<void>;
  getCommentsCount: () => number;
  clearComments: () => void;
  clearPostsStore: () => void;
}

const usePostsStore = create(
  persist<PostsState>(
    (set, get) => ({
      posts: [],

      postSelected: null,

      comments: [],

      counterDetailViews: 0,

      isLoading: false,

      fetchPosts: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get(`${BASE_URL}/posts`);
          set({ posts: response.data });
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      getPostsCount: () => get().posts.length,

      clearPosts: () => set({ posts: [] }),

      setPostSelected: (postSelected: Post) =>
        set({ postSelected, counterDetailViews: get().counterDetailViews + 1 }),

      fetchCommentsByPost: async (postId: number) => {
        set({ isLoading: true });
        try {
          const response = await axios.get(
            `${BASE_URL}/posts/${postId}/comments`
          );
          set({ comments: response.data });
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      getCommentsCount: () => get().comments.length,

      clearComments: () => set({ comments: [] }),

      clearPostsStore: () =>
        set({
          posts: [],
          postSelected: null,
          comments: [],
          counterDetailViews: 0,
        }),
    }),
    {
      name: "posts-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePostsStore;
