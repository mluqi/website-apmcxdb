import React from "react";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { PhoneIcon, MapPinIcon } from "lucide-react";
import { useKontak } from "../../contexts/KontakContext";

const KontakKamiPage: React.FC = () => {
  const { kontak, loading } = useKontak();

  const teleponList = kontak?.telepon
    ? kontak.telepon.split(",").map((t) => t.trim())
    : [];
  const emailList = kontak?.email
    ? kontak.email.split(",").map((e) => e.trim())
    : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent to-secondary py-12 pt-44 md:pt-44 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tim kami siap membantu menjawab pertanyaan Anda. Mari berbincang!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-26 -mt-10 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi Kontak
              </h2>

              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <PhoneIcon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Telepon</h3>
                      {teleponList.length > 0 ? (
                        teleponList.map((t, i) => (
                          <p className="text-gray-600" key={i}>
                            {t}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-600">-</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <EnvelopeClosedIcon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      {emailList.length > 0 ? (
                        emailList.map((e, i) => (
                          <p className="text-gray-600" key={i}>
                            {e}
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-600">-</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/10 p-3 rounded-full mr-4">
                      <MapPinIcon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Alamat</h3>
                      <p className="text-gray-600">
                        {kontak?.alamat}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Map Section */}
          <div className="container mx-auto px-4 pb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {kontak?.gmaps ? (
                <iframe
                  src={kontak.gmaps}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl"
                  title="Lokasi"
                ></iframe>
              ) : (
                <div className="w-full h-[450px] flex items-center justify-center bg-gray-100 rounded-xl">
                  <p>Memuat peta lokasi...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontakKamiPage;
