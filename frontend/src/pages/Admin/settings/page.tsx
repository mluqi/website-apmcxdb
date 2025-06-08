import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const SettingsPage = () => {
  const { changePassword } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (newPassword !== confirmNewPassword) {
      setError("Password baru dan konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    const result = await changePassword(
      oldPassword,
      newPassword,
      confirmNewPassword
    );

    if (result.success) {
      setSuccess(result.message || "Password berhasil diubah.");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setError(result.message || "Gagal mengubah password.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md bg-white rounded-lg shadow-lg mt-12 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Ganti Password</h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Password Lama</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password Baru</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-6 py-2 rounded font-semibold ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
