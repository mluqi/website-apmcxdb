import React, { useState } from "react";
import { useLayanan } from "../../../contexts/LayananContext";
import type { Layanan } from "../../../contexts/LayananContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BASE_IMAGE_URL = "http://localhost:8000/api/storage/";

type FormState = {
  id: number;
  title: string;
  konten: string;
  image: File | null;
  button_text: string;
  button_link: string;
};

const EditLayananPage: React.FC = () => {
  const { layanan, loading, updateLayanan } = useLayanan();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Record<number, FormState>>({});
  const [imagePreview, setImagePreview] = useState<
    Record<number, string | null>
  >({});
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (item: Layanan) => {
    setEditingId(item.id);
    setForm({
      [item.id]: {
        id: item.id,
        title: item.title,
        konten: item.konten,
        image: null,
        button_text: item.button_text,
        button_link: item.button_link,
      },
    });
    setImagePreview({
      [item.id]: item.image ? BASE_IMAGE_URL + item.image : null,
    });
    setSuccess(null);
    setError(null);
  };

  const handleChange = (
    id: number,
    field: keyof FormState,
    value: string | File | null
  ) => {
    setForm({
      ...form,
      [id]: {
        ...form[id],
        [field]: value,
      },
    });
  };

  const handleFile = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleChange(id, "image", file);
    if (file) {
      setImagePreview({
        ...imagePreview,
        [id]: URL.createObjectURL(file),
      });
    } else {
      setImagePreview({
        ...imagePreview,
        [id]: layanan.find((l) => l.id === id)?.image
          ? BASE_IMAGE_URL + layanan.find((l) => l.id === id)!.image
          : null,
      });
    }
  };

  const handleSave = async (item: Layanan) => {
    setSuccess(null);
    setError(null);
    const data = new FormData();
    data.append("id", String(item.id));
    data.append("title", form[item.id]?.title ?? "");
    data.append("konten", form[item.id]?.konten ?? "");
    data.append("button_text", form[item.id]?.button_text ?? "");
    data.append("button_link", form[item.id]?.button_link ?? "");
    if (form[item.id]?.image) {
      data.append("image", form[item.id].image as File);
    }
    const ok = await updateLayanan(item.id, data);
    if (ok) {
      setSuccess("Berhasil disimpan.");
      setEditingId(null);
    } else {
      setError("Gagal menyimpan perubahan.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-76 max-w-7xl bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-6">Edit Layanan</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-10">
          {layanan.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4 bg-gray-50"
            >
              <div className="w-44 font-mono text-xs text-gray-500">
                <div>
                  <span className="font-bold">{item.title}</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {editingId === item.id ? (
                  <>
                    <label className="block font-medium mb-1">Judul</label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 mb-2"
                      value={form[item.id]?.title ?? ""}
                      onChange={(e) =>
                        handleChange(item.id, "title", e.target.value)
                      }
                    />
                    <label className="block font-medium mb-1">Konten</label>
                    <ReactQuill
                      value={form[item.id]?.konten ?? ""}
                      onChange={(val) => handleChange(item.id, "konten", val)}
                      theme="snow"
                      className="bg-white mb-2"
                    />
                    <label className="block font-medium mb-1">Gambar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFile(item.id, e)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {imagePreview[item.id] && (
                      <div className="mt-2 flex justify-center">
                        <img
                          src={imagePreview[item.id]!}
                          alt="Preview"
                          className="rounded max-h-32 object-contain border bg-white"
                        />
                      </div>
                    )}
                    <label className="block font-medium mb-1 mt-2">
                      Teks Tombol
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 mb-2"
                      value={form[item.id]?.button_text ?? ""}
                      onChange={(e) =>
                        handleChange(item.id, "button_text", e.target.value)
                      }
                    />
                    <label className="block font-medium mb-1">
                      Link Tombol
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 mb-2"
                      value={form[item.id]?.button_link ?? ""}
                      onChange={(e) =>
                        handleChange(item.id, "button_link", e.target.value)
                      }
                    />
                  </>
                ) : (
                  <>
                    <div className="font-bold text-lg">{item.title}</div>
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{ __html: item.konten }}
                    />
                    {item.image && (
                      <img
                        src={BASE_IMAGE_URL + item.image}
                        alt={item.title}
                        className="max-h-20 object-contain border bg-white rounded"
                      />
                    )}
                    <div>
                      <span className="font-semibold">Tombol:</span>{" "}
                      {item.button_text} ({item.button_link})
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2 min-w-[100px]">
                {editingId === item.id ? (
                  <>
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded shadow hover:bg-blue-700 transition"
                      onClick={() => handleSave(item)}
                      type="button"
                    >
                      Simpan
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-1 rounded shadow hover:bg-gray-300 transition"
                      onClick={() => setEditingId(null)}
                      type="button"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-yellow-400 text-white px-4 py-1 rounded shadow hover:bg-yellow-500 transition"
                    onClick={() => handleEdit(item)}
                    type="button"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
          {success && <div className="text-green-600 mt-4">{success}</div>}
          {error && <div className="text-red-600 mt-4">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default EditLayananPage;
