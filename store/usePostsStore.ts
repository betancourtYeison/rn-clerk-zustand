import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Post } from "@/models/post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface PostsState {
  posts: Post[];
  fetchPosts: () => void;
  getPostsCount: () => void;
}

const usePostsStore = create(
  persist<PostsState>(
    (set, get) => ({
      posts: [],

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
    }),
    {
      name: "posts-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default usePostsStore;
