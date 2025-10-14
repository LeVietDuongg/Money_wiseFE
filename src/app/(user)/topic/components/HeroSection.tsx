import Image, { StaticImageData } from "next/image";

type HeroProps = {
  image: StaticImageData | string;
  title: string;
  subtitle: string;
  topicKey?: string; // Add optional topicKey prop
};

export default function HeroSection({ image, title, subtitle, topicKey }: HeroProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] max-h-[400px] sm:max-h-[500px]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className={`object-cover ${topicKey === "huutri55" ? "object-bottom" : "object-center"}`}
        />

        {/* Overlay chữ */}
        <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-4 sm:px-8 md:px-12">
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-white drop-shadow-md max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
