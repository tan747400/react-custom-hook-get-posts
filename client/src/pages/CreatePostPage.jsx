import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

function CreatePostPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create Post Page</h1>

      {/* ส่ง onSuccess: หลังสร้างสำเร็จให้กลับหน้า Home */}
      <CreatePostForm onSuccess={() => navigate("/")} />

      {/* ปุ่ม Back อยู่นอกฟอร์ม และเป็น type="button" */}
      <button type="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default CreatePostPage;
