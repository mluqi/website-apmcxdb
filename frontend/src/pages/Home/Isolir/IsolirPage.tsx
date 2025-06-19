import React from "react";

const IsolirPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-bl from-accent to-secondary p-4 font-sans">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        {/* Top Section: Icon and "NO INTERNET CONNECTION" */}
        <div className="mb-8">
          <div className="flex flex-col items-center justify-center">
            {/* Simplified representation for the icon using emojis.
                In a real application, you would use an actual SVG or image asset here. */}
            <div className="relative w-64 h-32 mb-4 flex items-center justify-center">
                {/* Doraemon-like character placeholder */}
                <span className="text-8xl absolute top-0 left-1/4 -translate-x-1/2" role="img" aria-label="Doraemon character">😿</span>
                {/* Globe */}
                <span className="text-6xl absolute top-1/3 left-1/2 -translate-x-1/2" role="img" aria-label="Globe">🌎</span>
                {/* No WiFi/Disconnected Symbol */}
                <span className="text-5xl absolute top-0 right-1/4 translate-x-1/2" role="img" aria-label="No WiFi">📡🚫</span>
                {/* Plug */}
                <span className="text-5xl absolute top-2/3 right-1/4 translate-x-1/2 rotate-45" role="img" aria-label="Plug">🔌</span>
            </div>
            <p className="text-xl font-bold text-red-600 uppercase mt-4">NO INTERNET CONNECTION</p>
            <div className="mt-2 text-red-600 text-3xl font-bold leading-none">!</div>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-accent/80 mb-6">
          PELANGGAN YANG TERHORMAT
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Kami informasikan bahwa layanan internet Anda saat ini tidak dapat
          digunakan dikarenakan ada tagihan yang harus diselesaikan.
          Agar layanan internet dapat digunakan kembali, silahkan lakukan
          pembayaran melalui transfer bank.
        </p>

        {/* Bank Transfer Details */}
        <div className="bg-secondary/30 border border-accent/20 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-xl font-semibold text-accent/80 mb-4">
            Pembayaran Melalui Transfer Bank:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-gray-800">Bank Rakyat Indonesia (BRI)</p>
              <p className="text-gray-700">No. Rek: <span className="font-mono bg-gray-200 px-2 py-1 rounded text-base">4233-01-0012345-06</span></p>
              <p className="text-gray-700">A.N: ASEP SYAEFU ROKHMAN</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">Rekening DANA</p>
              <p className="text-gray-700">No: <span className="font-mono bg-gray-200 px-2 py-1 rounded text-base">085224375422</span></p>
              <p className="text-gray-700">A.N: ASEP SYAEFU ROKHMAN</p>
            </div>
          </div>
        </div>

        {/* Footer Message and Contact */}
        <div className="text-gray-600 text-sm mt-8">
          <p className="mb-2">
            DEMIKIAN INFORMASI KAMI SAMPAIKAN - TERIMA KASIH ATAS KERJASAMANYA
          </p>
            APMCXDB.NET - <a href="https://wa.me/+6289677600427" className="text-accent hover:underline">Kontak Customer Service</a>
          <p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IsolirPage;