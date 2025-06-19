import React from "react";
import { Link } from "react-router-dom";
import { useLayanan } from "@/contexts/LayananContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0-beta.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0-beta.0/images/marker-shadow.png",
});
import { useLocationHotspot } from "@/contexts/LocationHotspotContext";

const BASE_IMAGE_URL = "https://dev4-p3.palindo.id/api/storage/";

const LayananHotspotPage: React.FC = () => {
  const { layanan, loading } = useLayanan();
  const { locations } = useLocationHotspot();
  const data = layanan[1];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-semibold text-gray-700">
          Layanan tidak ditemukan.
        </h2>
      </div>
    );
  }

  const mapCenter =
    locations.length > 0
      ? [locations[0].lat, locations[0].long]
      : [-6.714476673545407, 108.56019973754884];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-accent to-secondary py-20 pt-44 md:pt-44 text-white">
        <div className="container mx-auto px-4 text-center  md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Solusi Hotspot & WiFi Publik Handal
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Sediakan akses internet mudah dan terkontrol untuk pelanggan, tamu,
            atau komunitas Anda dengan layanan hotspot profesional kami.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-20">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-secondary mb-6">
            {data.title}
          </h2>
          {data.image && (
            <div className="flex justify-center mb-6">
              <img
                src={BASE_IMAGE_URL + data.image}
                alt={data.title}
                className="max-h-64 rounded-lg object-contain border bg-white"
              />
            </div>
          )}
          <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={{ __html: data.konten }}
          ></div>
          <div className="mt-8 text-center">
            <Link
              to={data.button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer shadow-md hover:bg-secondary hover:-translate-y-1 transform"
            >
              {data.button_text}
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 md:px-20">
        <h2 className="text-2xl font-semibold text-secondary mb-6">
          Lokasi Hotspot Kami
        </h2>
        <MapContainer
          center={mapCenter as [number, number]}
          zoom={13}
          className="h-96 rounded-lg shadow-lg"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.long]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <div className="font-semibold">{loc.nama}</div>
                  <div className="text-xs">{loc.alamat}</div>
                  <div className="text-xs text-gray-400">
                    Lat: {loc.lat}, Lng: {loc.long}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LayananHotspotPage;
