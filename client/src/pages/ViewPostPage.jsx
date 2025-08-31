import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useBlogPosts from "../hooks/useBlogPosts";

function ViewPostPage() {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  // โพสต์เดี่ยว
  const [post, setPost] = useState(null);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostError, setIsPostError] = useState(false);

  // โพสต์ทั้งหมด (ใต้บทความ) — ใช้ custom hook เพื่อลดซ้ำซ้อน
  const { posts, isLoading: isListLoading, isError: isListError } = useBlogPosts();

  const getPost = async (id) => {
    setIsPostError(false);
    setIsPostLoading(true);
    try {
      const res = await axios.get(`http://localhost:4000/posts/${id}`);
      const data = res?.data?.data ?? res?.data ?? null;
      setPost(data);
    } catch (_) {
      setIsPostError(true);
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    if (postId) getPost(postId);
  }, [postId]);

  return (
    <div>
      <h1>View Post Page</h1>

      {/* โพสต์เดี่ยว */}
      {isPostLoading && <h2>Loading post…</h2>}
      {isPostError && <h2>Failed to load this post.</h2>}
      {!isPostLoading && !isPostError && post && (
        <div className="view-post-container">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )}

      <hr />

      {/* โพสต์ทั้งหมด (อยู่ด้านล่างตาม requirement) */}
      <div className="show-all-posts-container">
        <h2>All Posts</h2>
        {isListLoading && <h3>Loading …</h3>}
        {isListError && <h3>Request failed</h3>}
        {!isListLoading &&
          !isListError &&
          posts.map((p) => (
            <div key={p.id} className="post">
              <h3>{p.title}</h3>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={() => navigate(`/post/view/${p.id}`)}
                >
                  View post
                </button>
              </div>
            </div>
          ))}
      </div>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewPostPage;
