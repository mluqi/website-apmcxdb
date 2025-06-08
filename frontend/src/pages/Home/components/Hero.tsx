import { LightningBoltIcon } from "@radix-ui/react-icons";

// const RocketIllustration = () => (
//   <svg viewBox="0 0 300 300" className="w-full h-auto">
//     {/* Body */}
//     <g transform="translate(-40 -80) rotate(-45) scale(2,-2)">
//       {/* Main rocket body */}
//       <path
//         d="M0,-100 L20,-120 L20,-180 L-20,-180 L-20,-120 Z"
//         fill="#3B82F6"
//       />
//       <path
//         d="M-20,-120 L-15,-125 L-15,-175 L15,-175 L15,-125 L20,-120 Z"
//         fill="#2563EB"
//       />

//       {/* Rocket window */}
//       <circle cx="0" cy="-150" r="8" fill="#BFDBFE" />
//       <circle cx="0" cy="-150" r="5" fill="#EFF6FF" />

//       <path d="M20,-160 L40,-180 L40,-160 L20,-140 Z" fill="#1D4ED8" />
//       <path d="M-20,-160 L-40,-180 L-40,-160 L-20,-140 Z" fill="#1D4ED8" />

//       {/* Rocket flame */}
//       <g className="animate-pulse">
//         <path d="M-15,-180 L0,-220 L15,-180 Z" fill="#F97316" />
//         <path d="M-10,-180 L0,-200 L10,-180 Z" fill="#F59E0B" />
//       </g>
//     </g>

//     {/* Speed lines */}
//     <g
//       stroke="#93C5FD"
//       strokeWidth="1"
//       strokeDasharray="6 3"
//       opacity="0.2"
//       transform="translate(130, 55)"
//       className="animate-pulse"
//     >
//       <line x1="50" y1="50" x2="150" y2="150" />
//       <line x1="100" y1="80" x2="180" y2="160" />
//       <line x1="30" y1="120" x2="100" y2="190" />
//     </g>
//   </svg>
// );

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-secondary/10 pt-32 pb-2 md:pt-56 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 order-2 md:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <LightningBoltIcon className="w-4 h-4 mr-2" />
              Internet Dedicated Premium
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Internet <span className="text-secondary">Super Stabil</span>{" "}
              untuk Performa Tanpa Kompromi
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Solusi konektivitas kelas enterprise dengan jaminan kualitas untuk
              kebutuhan bisnis dan rumah premium.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-accent text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:bg-secondary hover-scale-105">
                Daftar Sekarang
              </button>
              <button className="bg-white hover:bg-secondary hover-scale-105 hover:text-white text-gray-800 font-medium py-3 px-8 border border-gray-300 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm">
                Konsultasi Gratis
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full max-h-[300px] md:min-h-[400px] flex items-center justify-center z-10 order-2 md:order-1 md:mt-32">
            <div className="relative w-full h-full max-w-md mx-auto">
              {/* <RocketIllustration /> */}
              <img
                src="/assets/hero.png"
                alt="Ilustrasi Layanan Internet Cepat"
                className="w-full h-auto object-contain max-h-[150px] md:max-h-[450px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
