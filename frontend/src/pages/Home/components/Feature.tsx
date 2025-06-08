import { ClockIcon, DashboardIcon, ReloadIcon } from "@radix-ui/react-icons";

const features = [
  {
    icon: <DashboardIcon className="w-10 h-10 text-blue-600" />,
    iconBg: "bg-blue-100",
    title: "Stabil Latency",
    desc: "Jelajahi internet tanpa khawatir dengan penggunaan data Bebas FUP dan Jaringan 100% Fiber Optic.",
  },
  {
    icon: <ReloadIcon className="w-10 h-10 text-orange-600" />,
    iconBg: "bg-orange-100",
    title: "99.5% SLA",
    desc: "Layanan internet Dedicated kita memberikan kecepatan SLA 99,5% / Service Level Agreement.",
  },
  {
    icon: <ClockIcon className="w-10 h-10 text-blue-600" />,
    iconBg: "bg-blue-100",
    title: "24/7 Service",
    desc: "Customer Support 7 x 24 Jam dengan layanan terbaik untuk anda.",
  },
];

const Feature = () => {
  return (
    <div className="md:py-12 py-12 px-4 md:px-56 bg-gradient-to-b from-secondary/10 to-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Pelayanan Terbaik Untuk Anda
        </h2>
        <p className="mt-4 text-md text-gray-400 max-w-2xl mx-auto">
          Dengan dedikasi penuh, kami menghadirkan layanan yang cepat, ramah,
          dan profesional untuk memenuhi setiap kebutuhan Anda.
        </p>
        <hr className="mx-auto h-px my-8 bg-accent/20 w-[300px] text-center border-0"></hr>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
        {features.map((f, i) => (
          <div
            key={i}
            className={`
        rounded-xl shadow-lg overflow-hidden
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-2
        bg-white group
      `}
          >
            <div className="p-8">
              <div className={`flex justify-center mb-6`}>
                <div
                  className={`p-4 ${f.iconBg} rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2 group-hover:text-accent transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
