import { CheckIcon, WifiIcon, CctvIcon, NetworkIcon } from "lucide-react";
import { usePublic } from "@/contexts/PublicContext";

const iconMap = [
  <NetworkIcon className="w-8 h-8 text-blue-600" />,
  <CctvIcon className="w-8 h-8 text-green-600" />,
  <WifiIcon className="w-8 h-8 text-orange-600" />,
];
const colorMap = ["bg-blue-50", "bg-green-50", "bg-orange-50"];

const Layanan = () => {
  const { landingContent } = usePublic();
  const layananContent = landingContent.filter(
    (item) => item.section === "layanan"
  );
  const layananTitle = layananContent.find(
    (item) => item.key_name === "title_layanan"
  )?.value;

  // Ambil semua nomor layanan yang ada (misal: 1,2,3)
  const layananNumbers = Array.from(
    new Set(
      layananContent
        .filter((item) => /^title_\d+$/.test(item.key_name))
        .map((item) => item.key_name.match(/\d+$/)?.[0])
        .filter(Boolean)
    )
  );

  const layanan = layananNumbers.map((num, idx) => {
    const nama =
      layananContent.find((item) => item.key_name === `title_${num}`)?.value ||
      `Layanan ${num}`;
    const harga =
      layananContent.find((item) => item.key_name === `price_${num}`)?.value ||
      "-";
    const benefitStr =
      layananContent.find((item) => item.key_name === `benefit_${num}`)
        ?.value || "[]";
    let keunggulan: string[] = [];
    try {
      keunggulan = JSON.parse(benefitStr);
    } catch {
      keunggulan = [];
    }
    return {
      icon: iconMap[idx] || iconMap[0],
      nama,
      harga,
      keunggulan,
      warna: colorMap[idx] || colorMap[0],
    };
  });

  return (
    <section className="py-16 md:py-44 bg-gradient-to-b from-white to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {layananTitle || "Paket Layanan Unggulan Kami"}
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
                    Rp.{" "}
                  </span>
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
