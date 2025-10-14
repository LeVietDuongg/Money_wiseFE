"use client";

import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

type HeroProps = {
  image: StaticImageData | string;
  title: string;
  subtitle: string;
};

export default function HeroSection({ image, title, subtitle }: HeroProps) {
  const pathname = usePathname();

  // Kiểm tra nếu đường dẫn là /topic/retire-55
  const isRetire55 = pathname === "/topic/retire-55";

  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] max-h-[400px] sm:max-h-[500px]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className={`object-cover ${isRetire55 ? "object-top" : "object-center"}`}
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