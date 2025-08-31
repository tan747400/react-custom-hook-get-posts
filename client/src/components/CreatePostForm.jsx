import { useState } from "react";
import axios from "axios";

function CreatePostForm({ onSuccess }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
      await axios.post("http://localhost:4000/posts", {
        title: formData.title.trim(),
        content: formData.content.trim(),
      });
      onSuccess?.(); // ← สร้างเสร็จ กลับ Home
    } catch (err) {
      setError("สร้างโพสต์ไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Post Form</h1>

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

      <div className="form-actions" style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Create"}
        </button>
        {/* ถ้าจะใส่ปุ่ม Back/Cancel “ในฟอร์ม” ให้ใช้ type="button" เสมอ */}
        {/* <button type="button" onClick={() => ...}>Back to Home</button> */}
      </div>
    </form>
  );
}

export default CreatePostForm;
