import { usePublic } from "@/contexts/PublicContext";

const BASE_IMAGE_URL = "http://localhost:8000/api/storage/";

const PartnerSection = () => {
  const { landingContent, loading } = usePublic();

  const partners = landingContent
    .filter((item) => item.section === "partner" && item.type === "image")
    .sort((a, b) => a.sort_order - b.sort_order);

  const backgroundImage = "url(/assets/bg-partner.jpg)";

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center text-white"
      style={{
        backgroundImage: backgroundImage || "none",
        backgroundColor: backgroundImage
          ? ""
          : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      {/* Overlay untuk background image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Partner Terpercaya Kami
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Berkolaborasi dengan brand-brand ternama untuk memberikan layanan
            terbaik
          </p>
        </div>

        {/* Logo Partner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-transparent flex justify-center items-center p-4 transition-transform transform hover:scale-105"
              style={{ minHeight: "80px" }}
            >
              <img
                src={BASE_IMAGE_URL + partner.value}
                alt={partner.key_name || "Partner"}
                className="max-h-16 w-auto object-contain transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
          {!loading && partners.length === 0 && (
            <div className="col-span-full text-center text-white/70">
              Belum ada data partner.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
