"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

type EmployeeType = {
  id: string;
  name: string;
  role: string;
  img: StaticImageData;
};

export default function DifferentEmployee({ employees }: { employees: EmployeeType[] }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mt-10 mx-auto mb-12">
      {/* Tiêu đề */}
      <h2 className="col-span-full text-2xl font-bold text-center mb-4">
        {t("introduce.employee.otherEmployees")}
      </h2>

      {employees.slice(0, 3).map((person) => (
        <Link
          key={person.id}
          href={`/introduce/employee/${person.id}`}
          className="bg-white shadow-md rounded-lg flex flex-col text-center hover:shadow-lg transition overflow-hidden"
        >
          <Image
            src={person.img}
            alt={person.name}
            className="w-full h-72 object-cover rounded-t-lg"
          />
          <div className="p-4">
            {/* Chức vụ lên trên */}
            <p className="text-gray-600 font-medium mb-1">{person.role}</p>
            {/* Tên xuống dưới */}
            <h3 className="font-semibold text-lg">{person.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
