import { useState, useEffect } from "react";
import axios from "axios";

function EditPostForm({ postId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchPost() {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/posts/${postId}`);
        const p = res?.data?.data ?? res?.data ?? {};
        if (!ignore) {
          setFormData({
            title: p.title || "",
            content: p.content || "",
          });
        }
      } catch (e) {
        if (!ignore) setError("โหลดโพสต์ไม่สำเร็จ");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (postId) fetchPost();
    return () => { ignore = true; };
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) return setError("กรุณากรอก Title");
    if (!formData.content.trim()) return setError("กรุณากรอก Content");

    try {
      setSaving(true);
      await axios.put(`http://localhost:4000/posts/${postId}`, {
        title: formData.title.trim(),
        content: formData.content.trim(),
      });
      onSuccess?.(); // callback จากหน้า EditPostPage
    } catch (err) {
      setError("อัปเดตโพสต์ไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Edit Post Form</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter title here"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Enter content here"
          value={formData.content}
          onChange={handleChange}
          rows={4}
          cols={30}
          required
        />
      </div>

      <div className="form-actions" style={{ display: "flex", gap: "8px" }}>
        {/* ปุ่ม submit */}
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update"}
        </button>
        {/* ปุ่ม cancel */}
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EditPostForm;
