const PartnerSection = () => {
  const partners = [
    {
      id: 1,
      logo: "https://via.placeholder.com/150x80?text=Partner+1",
      alt: "Partner 1",
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/150x80?text=Partner+2",
      alt: "Partner 2",
    },
    {
      id: 3,
      logo: "https://via.placeholder.com/150x80?text=Partner+3",
      alt: "Partner 3",
    },
    {
      id: 4,
      logo: "https://via.placeholder.com/150x80?text=Partner+4",
      alt: "Partner 4",
    },
    {
      id: 5,
      logo: "https://via.placeholder.com/150x80?text=Partner+5",
      alt: "Partner 5",
    },
    {
      id: 6,
      logo: "https://via.placeholder.com/150x80?text=Partner+6",
      alt: "Partner 6",
    },
  ];

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
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-32"
            >
              <img
                src={partner.logo}
                alt={partner.alt}
                className="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
