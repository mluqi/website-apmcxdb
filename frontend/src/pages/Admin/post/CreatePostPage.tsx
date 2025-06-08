import React, { useState } from "react";
import { usePost } from "../../../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreatePostPage = () => {
  const { createPost } = usePost();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    post_title: "",
    post_konten: "",
    post_image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, post_image: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleQuillChange = (content: string) => {
    setForm((prevForm) => ({ ...prevForm, post_konten: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post_title", form.post_title);
    formData.append("post_konten", form.post_konten);
    if (form.post_image) formData.append("post_image", form.post_image);

    const success = await createPost(formData);
    if (success) {
      navigate("/admin/post");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 lg:ml-76 max-w-7xl bg-white rounded-lg shadow-lg mt-12">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">
          Tambah Post Baru
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="post_title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Judul Post
            </label>
            <input
              type="text"
              name="post_title"
              id="post_title"
              placeholder="Masukkan judul post"
              value={form.post_title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="post_konten"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Konten Post
            </label>
            <div className="mt-1 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
              <ReactQuill
                theme="snow"
                id="post_konten"
                value={form.post_konten}
                onChange={handleQuillChange}
                modules={CreatePostPage.modules}
                formats={CreatePostPage.formats}
                className="[&_.ql-toolbar]:rounded-t-lg [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-base [&_.ql-editor]:p-3"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="post_image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gambar Unggulan (Opsional)
            </label>
            <input
              type="file"
              name="post_image"
              id="post_image"
              onChange={handleFile}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 rounded max-h-56 object-contain border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Simpan Post
          </button>
        </form>
      </div>
    </div>
  );
};

CreatePostPage.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

CreatePostPage.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
  "video",
];

export default CreatePostPage;
