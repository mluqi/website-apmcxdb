import { BuildingIcon } from "lucide-react";
import { useAbout } from "../../contexts/AboutContext";

const BASE_IMAGE_URL = "http://localhost:8000/api/storage/";

const TentangKamiPage = () => {
  const { about, loading } = useAbout();
  console.log(about);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-accent to-secondary py-12 pt-44 md:pt-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tentang Perusahaan Kami
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Menyediakan solusi konektivitas terbaik sejak 2010 dengan komitmen
            pada kualitas dan inovasi.
          </p>
        </div>
      </div>

      {/* Profil Perusahaan */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-textcolor mb-6">
                <BuildingIcon className="inline mr-3 w-8 h-8 text-accent" />
                Profil Perusahaan
              </h2>
              {loading ? (
                <p>Loading...</p>
              ) : about ? (
                <div
                  className="text-lg text-gray-600 mb-6 prose"
                  dangerouslySetInnerHTML={{ __html: about.konten }}
                />
              ) : (
                <p className="text-gray-400">Data tidak tersedia.</p>
              )}
            </div>
            <div className="mt-10 lg:mt-0">
              {about?.image ? (
                <img
                  src={`${BASE_IMAGE_URL}${about.image}`}
                  alt="Kantor Kami"
                  className="w-full rounded-lg shadow-xl"
                />
              ) : (
                <img
                  src="https://source.unsplash.com/random/800x600/?office,meeting"
                  alt="Kantor Kami"
                  className="w-full rounded-lg shadow-xl"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TentangKamiPage;