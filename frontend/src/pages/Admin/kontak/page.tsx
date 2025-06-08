import React, { useEffect, useState } from "react";
import { useKontak } from "../../../contexts/KontakContext";
import api from "../../../services/api";

const EditKontakPage = () => {
  const { kontak, loading, fetchKontak } = useKontak();
  const [form, setForm] = useState({
    telepon: "",
    email: "",
    alamat: "",
    gmaps: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (kontak) {
      setForm({
        telepon: kontak.telepon || "",
        email: kontak.email || "",
        alamat: kontak.alamat || "",
        gmaps: kontak.gmaps || "",
      });
    }
  }, [kontak]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);
    try {
      await api.put("/kontak", form);
      setSuccess("Data kontak berhasil diupdate.");
      fetchKontak();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal mengupdate data kontak.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-76 max-w-7xl bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-6">Edit Data Kontak</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Telepon</label>
            <input
              type="text"
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Pisahkan dengan koma jika lebih dari satu"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Google Maps Embed Link
            </label>
            <input
              type="text"
              name="gmaps"
              value={form.gmaps}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          {success && <div className="text-green-600 mt-2">{success}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default EditKontakPage;
