import { LightningBoltIcon } from "@radix-ui/react-icons";
import { usePublic } from "@/contexts/PublicContext";

const BASE_IMAGE_URL = "https://dev4-p3.palindo.id/api/storage/";

const Hero = () => {
  const { landingContent } = usePublic();
  const heroContent = landingContent.filter((item) => item.section === "hero");
  const heroImage = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "image_hero"
  )?.value;
  const HeroTitle = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "text_hero"
  )?.value;
  const HeroSubtitle = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "subtext_hero"
  )?.value;
  const HeroButton = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "cta_text"
  )?.value;
  const HeroButtonLink = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "cta_link"
  )?.value;
  const HeroButton2 = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "cta2_text"
  )?.value;
  const HeroButton2Link = heroContent.find(
    (item) => item.section === "hero" && item.key_name === "cta2_link"
  )?.value;

  return (
    <div className="relative bg-gradient-to-b from-white to-secondary/10 pt-32 pb-4 md:pt-62 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 order-2 md:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <LightningBoltIcon className="w-4 h-4 mr-2" />
              Internet Dedicated Premium
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              dangerouslySetInnerHTML={{
                __html: HeroTitle || "",
              }}
            />

            <p
              className="text-lg text-gray-600 max-w-lg"
              dangerouslySetInnerHTML={{ __html: HeroSubtitle || "" }}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  if (HeroButtonLink) {
                    window.location.href = HeroButtonLink;
                  }
                }}
                className="bg-accent text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm hover:bg-secondary hover-scale-105"
              >
                {HeroButton}
              </button>
              <button
                onClick={() => {
                  if (HeroButton2Link) {
                    window.location.href = HeroButton2Link;
                  }
                }}
                className="bg-white hover:bg-secondary hover-scale-105 hover:text-white text-gray-800 font-medium py-3 px-8 border border-gray-300 rounded-lg transition-colors duration-200 cursor-pointer shadow-sm"
              >
                {HeroButton2}
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full max-h-[300px] md:min-h-[400px] flex items-center justify-center z-10 order-2 md:order-1 md:mt-32">
            <div className="relative w-full h-full max-w-md mx-auto">
              <img
                src={`${BASE_IMAGE_URL}${heroImage}`}
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
