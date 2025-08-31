import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchPosts = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/posts");
      const list = res?.data?.data ?? res?.data ?? [];
      setPosts(Array.isArray(list) ? list : []);
    } catch (_) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, isError, refetch: fetchPosts };
}
