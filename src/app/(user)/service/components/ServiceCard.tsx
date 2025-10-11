import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    <div className="rounded-xl shadow-md border border-gray-100 p-4 bg-white hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        unoptimized
        className="rounded-lg mb-4 object-cover w-full h-48"
        onError={(e) => {
          console.error("❌ Image load error:", image);
          e.currentTarget.src = "/images/default-service.jpg";
        }}
      />
      <h4 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h4>
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
    </div>
  );
}
