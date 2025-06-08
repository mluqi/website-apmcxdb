import React, { useEffect, useState } from "react";
import { useAbout } from "../../../contexts/AboutContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BASE_IMAGE_URL = "http://localhost:8000/api/storage/";

const EditTentangKamiPage = () => {
  const { about, loading, editAbout } = useAbout();
  const [konten, setKonten] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (about) {
      setKonten(about.konten || "");
      // Set initial preview from existing image if available
      if (about.image) {
        setImagePreview(`${BASE_IMAGE_URL}${about.image}`);
      }
    }
  }, [about]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    // Clear preview if no file selected
    if (!file) {
      setImagePreview(about?.image ? `${BASE_IMAGE_URL}${about.image}` : null);
      return;
    }

    // Create preview for new file
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    const formData = new FormData();
    formData.append("konten", konten);
    if (image) formData.append("image", image);

    try {
      const ok = await editAbout(formData);
      if (ok) {
        setSuccess("Berhasil disimpan.");
        setImage(null);
      } else {
        setError("Gagal menyimpan perubahan.");
      }
    } catch (err) {
      console.error("Error saving about:", err);
      setError("Terjadi kesalahan saat menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-76 max-w-7xl bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-6">Edit Tentang Kami</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Konten Editor */}
          <div>
            <label className="block font-medium mb-1">Konten</label>
            <ReactQuill
              value={konten}
              onChange={setKonten}
              theme="snow"
              className="bg-white"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { indent: "-1" }, { indent: "+1" }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
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
              ]}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Gambar (opsional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-56 max-w-full object-contain rounded border p-1"
                />
                {image && (
                  <p className="text-xs text-gray-500 mt-1">
                    Gambar baru yang akan diupload
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-2 rounded font-semibold ${
              saving ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          {/* Status Messages */}
          {success && (
            <div className="p-3 mt-3 bg-green-50 text-green-700 rounded-md">
              {success}
            </div>
          )}
          {error && (
            <div className="p-3 mt-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default EditTentangKamiPage;
