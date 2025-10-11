import Image, { StaticImageData } from "next/image";

type EmployeeProps = {
  emp: {
    id: string;
    name: string;
    role: string;
    img: StaticImageData;
    bio: string;
  };
};

export default function Employee({ emp }: EmployeeProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 px-6">
      <div className="rounded-lg overflow-hidden flex flex-col md:flex-row transition bg-white shadow-sm">
        {/* Cột trái - Hình ảnh + khung chức vụ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 md:w-1/3">
          {/* Ảnh */}
          <Image
            width={300}
            height={300}
            src={emp.img}
            alt={emp.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          {/* Khung chức vụ */}
          <div className="mt-4 border border-gray-300 bg-gray-100 rounded-md px-4 py-2 text-black font-semibold text-center w-full">
            {emp.role}
          </div>
        </div>

        {/* Cột phải - Nội dung bio */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{emp.name}</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {emp.bio}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[80%] border-t border-green-800 mt-6 mx-auto"></div>
    </div>
  );
}
