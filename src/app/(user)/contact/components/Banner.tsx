import Image from "next/image";
import Banner1 from "@/assets/contact/anh-thanh-pho-1.jpg";

export default function Banner() {
  return (
    <div className="relative w-screen aspect-[16/9] sm:aspect-[3/1] lg:aspect-[1200/380] max-h-[400px] sm:max-h-[500px] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Background Image */}
      <Image
        alt="Banner Bottom"
        src={Banner1}
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  );
}