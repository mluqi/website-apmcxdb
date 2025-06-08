import React, { useState } from "react";
import { usePublic } from "../../../contexts/PublicContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BASE_IMAGE_URL = "http://localhost:8000/storage/";

const EditLandingPage = () => {
  const { landingContent, loading, updateLandingContent } = usePublic();
  const [editingId, setEditingId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<{ [key: number]: any }>({});
  const [imagePreview, setImagePreview] = useState<{
    [key: number]: string | null;
  }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      [item.id]: {
        value: item.value,
        file: null,
      },
    });
    setImagePreview({
      [item.id]:
        item.type === "image" && item.value
          ? BASE_IMAGE_URL + item.value
          : null,
    });
    setSuccess(null);
    setError(null);
  };

  // const handleChange = (
  //   id: number,
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setForm({
  //     ...form,
  //     [id]: {
  //       ...form[id],
  //       value: e.target.value,
  //     },
  //   });
  // };

  const handleFile = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({
      ...form,
      [id]: {
        ...form[id],
        file,
      },
    });
    if (file) {
      setImagePreview({
        ...imagePreview,
        [id]: URL.createObjectURL(file),
      });
    } else {
      setImagePreview({
        ...imagePreview,
        [id]: landingContent.find((c) => c.id === id)?.value
          ? BASE_IMAGE_URL + landingContent.find((c) => c.id === id)!.value
          : null,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (item: any) => {
    setSuccess(null);
    setError(null);
    const data = new FormData();
    data.append("id", String(item.id));
    data.append("section", item.section);
    data.append("key_name", item.key_name);
    data.append("type", item.type);
    data.append("sort_order", String(item.sort_order));
    if (item.type === "image" && form[item.id]?.file) {
      data.append("image", form[item.id].file); 
    } else {
      data.append("value", form[item.id]?.value ?? "");
    }
    const ok = await updateLandingContent(item.id, data);
    if (ok) {
      setSuccess("Berhasil disimpan.");
      setEditingId(null);
    } else {
      setError("Gagal menyimpan perubahan.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-76 max-w-7xl bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-6">Edit Landing Page Content</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-8">
          {["hero", "feature", "partner", "footer"].map((section) => (
            <div key={section}>
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {section}
              </h2>
              <div className="space-y-4">
                {landingContent
                  .filter((item) => item.section === section)
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="border rounded p-4 flex flex-col md:flex-row md:items-center gap-4"
                    >
                      <div className="w-40 font-mono text-xs text-gray-500">
                        <div>
                          <span className="font-bold">{item.key_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">{item.type}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        {editingId === item.id ? (
                          item.type === "image" ? (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFile(item.id, e)}
                              />
                              {imagePreview[item.id] && (
                                <img
                                  src={imagePreview[item.id]!}
                                  alt="Preview"
                                  className="mt-2 rounded max-h-32 object-contain border"
                                />
                              )}
                            </>
                          ) : (
                            <ReactQuill
                              value={form[item.id]?.value ?? ""}
                              onChange={(val) =>
                                setForm({
                                  ...form,
                                  [item.id]: {
                                    ...form[item.id],
                                    value: val,
                                  },
                                })
                              }
                              theme="snow"
                              className="bg-white"
                              modules={{
                                toolbar: [
                                  [
                                    { header: "1" },
                                    { header: "2" },
                                    { font: [] },
                                  ],
                                  [{ size: [] }],
                                  [
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strike",
                                    "blockquote",
                                  ],
                                  [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                  ],
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
                          )
                        ) : item.type === "image" ? (
                          item.value ? (
                            <img
                              src={BASE_IMAGE_URL + item.value}
                              alt={item.key_name}
                              className="max-h-20 object-contain border"
                            />
                          ) : (
                            <span className="italic text-gray-400">
                              Belum ada gambar
                            </span>
                          )
                        ) : (
                          <div
                            className="prose"
                            dangerouslySetInnerHTML={{ __html: item.value }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {editingId === item.id ? (
                          <>
                            <button
                              className="bg-blue-600 text-white px-4 py-1 rounded"
                              onClick={() => handleSave(item)}
                              type="button"
                            >
                              Simpan
                            </button>
                            <button
                              className="bg-gray-200 text-gray-700 px-4 py-1 rounded"
                              onClick={() => setEditingId(null)}
                              type="button"
                            >
                              Batal
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-yellow-400 text-white px-4 py-1 rounded"
                            onClick={() => handleEdit(item)}
                            type="button"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
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

export default EditLandingPage;
