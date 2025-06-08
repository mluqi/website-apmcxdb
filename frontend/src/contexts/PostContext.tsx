import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

export interface Post {
  id: number;
  post_title: string;
  post_konten: string;
  post_image?: string | null;
  post_date: string;
}

interface PostContextType {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  getPost: (id: number) => Promise<Post | null>;
  createPost: (data: FormData) => Promise<boolean>;
  updatePost: (id: number, data: FormData) => Promise<boolean>;
  deletePost: (id: number) => Promise<boolean>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const res = await api.get("/posts", { params: { page, limit } });
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const getPost = async (id: number) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data as Post;
    } catch {
      return null;
    }
  };

  const createPost = async (data: FormData) => {
    try {
      await api.post("/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchPosts(currentPage);
      return true;
    } catch {
      return false;
    }
  };

  const updatePost = async (id: number, data: FormData) => {
    try {
      await api.put(`/posts/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchPosts(currentPage);
      return true;
    } catch {
      return false;
    }
  };

  const deletePost = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);
      await fetchPosts(currentPage);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        totalPages,
        currentPage,
        loading,
        fetchPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePost must be used within PostProvider");
  return ctx;
};
