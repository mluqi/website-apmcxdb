import { CheckIcon, WifiIcon, CctvIcon, NetworkIcon } from "lucide-react";

const Layanan = () => {
  const layanan = [
    {
      icon: <NetworkIcon className="w-8 h-8 text-blue-600" />,
      nama: "Internet",
      harga: "Rp 299.000",
      keunggulan: [
        "Kecepatan stabil hingga 100 Mbps",
        "Unlimited Quota",
        "Jaringan Fiber Optic",
        "Support 24/7",
      ],
      warna: "bg-blue-50",
    },
    {
      icon: <CctvIcon className="w-8 h-8 text-green-600" />,
      nama: "CCTV",
      harga: "Rp 399.000",
      keunggulan: [
        "Monitoring 24 Jam",
        "Akses Online dari Mana Saja",
        "Pemasangan Profesional",
        "Garansi Perangkat",
      ],
      warna: "bg-green-50",
    },
    {
      icon: <WifiIcon className="w-8 h-8 text-orange-600" />,
      nama: "Hotspot",
      harga: "Rp 199.000",
      keunggulan: [
        "Akses WiFi Publik Mudah",
        "Manajemen User & Bandwidth",
        "Login Voucher",
        "Cocok untuk Cafe & Area Publik",
      ],
      warna: "bg-orange-50",
    },
  ];

  return (
    <section className="py-16 md:py-44 bg-gradient-to-b from-white to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Paket Layanan Unggulan Kami
          </h2>

          <p className="mt-4 text-md text-gray-400 max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan Anda
          </p>
          <hr className="mx-auto h-px my-8 bg-accent/20 w-[300px] text-center border-0"></hr>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layanan.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${item.warna}`}
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                  {item.nama}
                </h3>

                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {item.harga}
                  </span>
                  <span className="text-gray-600">/bulan</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {item.keunggulan.map((fitur, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5 mr-2" />
                      <span className="text-gray-700">{fitur}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 hover:bg-secondary cursor-pointer shadow-sm hover:shadow-md">
                  Langganan Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Layanan;
