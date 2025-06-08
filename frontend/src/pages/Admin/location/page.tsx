import React, { useState } from "react";
import { useLocationHotspot } from "@/contexts/LocationHotspotContext";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface FormState {
  nama: string;
  alamat: string;
  lat: number | null;
  long: number | null;
}

const defaultPosition = { lat: -6.714476673545407, lng: 108.56019973754884 };

const GeocodeButton: React.FC<{
  alamat: string;
  setLatLng: (lat: number, lng: number) => void;
  setMapCenter: (lat: number, lng: number) => void;
}> = ({ alamat, setLatLng, setMapCenter }) => {
  const [loading, setLoading] = useState(false);

  const handleGeocode = async () => {
    if (!alamat) return;
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        alamat
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setLatLng(lat, lng);
        setMapCenter(lat, lng);
      } else {
        alert("Alamat tidak ditemukan!");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Gagal mencari koordinat. Coba lagi.");
    }
    setLoading(false);
  };

  return (
    <button
      type="button"
      className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
      onClick={handleGeocode}
      disabled={loading}
    >
      {loading ? "Mencari..." : "Cari Koordinat"}
    </button>
  );
};

const LocationMarker: React.FC<{
  lat: number | null;
  lng: number | null;
  setLatLng: (lat: number, lng: number) => void;
  setMapCenter: (lat: number, lng: number) => void;
}> = ({ lat, lng, setLatLng, setMapCenter }) => {
  useMapEvents({
    click(e) {
      setLatLng(e.latlng.lat, e.latlng.lng);
      setMapCenter(e.latlng.lat, e.latlng.lng);
    },
  });
  return lat && lng ? <Marker position={[lat, lng]} /> : null;
};

const LocationHotspotPage: React.FC = () => {
  const { locations, loading, addLocation, deleteLocation } =
    useLocationHotspot();
  const [form, setForm] = useState<FormState>({
    nama: "",
    alamat: "",
    lat: null,
    long: null,
  });
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    defaultPosition
  );
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setLatLng = (lat: number, lng: number) => {
    setForm((prev) => ({ ...prev, lat: lat, long: lng }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (!form.nama || !form.alamat || form.lat === null || form.long === null) {
      setError("Semua field wajib diisi dan lokasi harus dipilih.");
      return;
    }
    // Kirim ke backend hanya saat submit
    const ok = await addLocation({
      nama: form.nama,
      alamat: form.alamat,
      lat: form.lat,
      long: form.long,
    });
    if (ok) {
      setSuccess("Lokasi berhasil ditambahkan.");
      setForm({ nama: "", alamat: "", lat: null, long: null });
      setMapCenter(defaultPosition);
    } else {
      setError("Gagal menambah lokasi.");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-76 max-w-7xl bg-white rounded-lg shadow-lg mt-12">
      <h1 className="text-2xl font-bold mb-6">Tambah Lokasi Hotspot</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div>
          <label className="block font-medium mb-1">Nama Lokasi</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Alamat</label>
          <div className="flex">
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
            <GeocodeButton
              alamat={form.alamat}
              setLatLng={setLatLng}
              setMapCenter={(lat, lng) => setMapCenter({ lat, lng })}
            />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Pilih Titik di Peta</label>
          <div className="w-full h-72 rounded overflow-hidden border">
            <MapContainer
              center={
                form.lat && form.long
                  ? [mapCenter.lat, mapCenter.lng]
                  : [defaultPosition.lat, defaultPosition.lng]
              }
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              key={mapCenter.lat + "," + mapCenter.lng}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Marker lokasi yang sedang diedit/dipilih */}
              <LocationMarker
                lat={form.lat}
                lng={form.long}
                setLatLng={setLatLng}
                setMapCenter={(lat, lng) => setMapCenter({ lat, lng })}
              />
              {/* Marker preview semua lokasi hotspot yang sudah ada */}
              {locations.map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.long]}>
                  <Popup>
                    <div>
                      <div className="font-semibold">{loc.nama}</div>
                      <div className="text-xs">{loc.alamat}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="text-sm mt-2 text-gray-500">
            Klik pada peta untuk memilih titik lokasi. <br />
            <span className="font-mono">
              {form.lat && form.long
                ? `Lat: ${form.lat}, Lng: ${form.long}`
                : "Belum dipilih"}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2 rounded font-semibold"
        >
          Simpan Lokasi
        </button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>

      <h2 className="text-xl font-semibold mb-4">Daftar Lokasi Hotspot</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {locations.map((loc) => (
            <li
              key={loc.id}
              className="flex items-center justify-between border rounded px-4 py-2"
            >
              <div>
                <div className="font-semibold">{loc.nama}</div>
                <div className="text-xs text-gray-500">{loc.alamat}</div>
                <div className="text-xs text-gray-400">
                  Lat: {loc.lat}, Lng: {loc.long}
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteLocation(loc.id)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationHotspotPage;
