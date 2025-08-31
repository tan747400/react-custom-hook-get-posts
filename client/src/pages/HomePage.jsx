import { useNavigate } from "react-router-dom";
import axios from "axios";
import useBlogPosts from "../hooks/useBlogPosts";

function HomePage() {
  const navigate = useNavigate();
  const { posts, isLoading, isError, refetch } = useBlogPosts();

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${id}`);
      refetch(); // ลบสำเร็จแล้วโหลดใหม่
    } catch (err) {
      alert("Delete failed: " + (err?.message || "unknown error"));
    }
  };

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Posts</h1>
        <button onClick={() => navigate("/post/create")}>Create Post</button>
      </div>

      {isLoading && <h2>Loading ....</h2>}
      {isError && <h2>Request failed</h2>}
      {!isLoading && !isError && posts.length === 0 && (
        <p>No posts yet. Try creating one.</p>
      )}

      <div className="board">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>

            <div className="post-actions">
              <button
                className="view-button"
                onClick={() => navigate(`/post/view/${post.id}`)}
              >
                View post
              </button>
              <button
                className="edit-button"
                onClick={() => navigate(`/post/edit/${post.id}`)}
              >
                Edit post
              </button>
            </div>

            <button
              className="delete-button"
              title="Delete"
              aria-label={`Delete ${post.title}`}
              onClick={() => deletePost(post.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
