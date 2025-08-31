import { useNavigate, useParams } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";

function EditPostPage() {
  const navigate = useNavigate();
  const { id: postId } = useParams();

  return (
    <div>
      <h1>Edit Post Page</h1>

      <EditPostForm
        postId={postId}
        onSuccess={() => navigate(`/post/view/${postId}`)} // อัปเดตสำเร็จ → กลับไปดูโพสต์
        onCancel={() => navigate(-1)}                     // ยกเลิก → ย้อนกลับ
      />

      {/* ปุ่ม Back อยู่ "นอกฟอร์ม" และกำหนด type="button" กันไม่ให้ submit ฟอร์ม */}
      <button type="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default EditPostPage;
