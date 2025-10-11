"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import MTP from "../../../../../../public/mtp.svg";

export default function Members() {
  const { t } = useLanguage();

  const employees = [
    { id: "Larry-Truong", key: "larry-truong", img: MTP },
    { id: "tran-thi-b", key: "tran-thi-b", img: MTP },
    { id: "le-van-c", key: "le-van-c", img: MTP },
    { id: "pham-thi-d", key: "pham-thi-d", img: MTP },
    { id: "hoang-van-e", key: "hoang-van-e", img: MTP },
  ];

  return (
    <div className="flex flex-col gap-12 items-center mt-24 px-4">
      {/* Top row - 3 members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {employees.slice(0, 3).map((emp) => (
          <Link
            key={emp.id}
            href={`/introduce/employee/${emp.id}`}
            className="bg-white shadow-md rounded-xl flex flex-col text-center hover:shadow-lg transition overflow-hidden"
          >
            {/* Ảnh */}
            <div className="w-full aspect-square overflow-hidden">
              <Image
                src={emp.img}
                alt={t(`introduce.employee.members.${emp.key}.name`)}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>

            {/* Nội dung */}
            <div className="p-4 md:p-5">
              <p className="text-xl text-black font-semibold uppercase tracking-wide">
                {t(`introduce.employee.members.${emp.key}.role`)}
              </p>
              <h3 className=" text-lg text-gray-800 mt-1">
                {t(`introduce.employee.members.${emp.key}.name`)}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom row - 2 members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-4xl lg:max-w-3xl">
        {employees.slice(3).map((emp) => (
          <Link
            key={emp.id}
            href={`/introduce/employee/${emp.id}`}
            className="bg-white shadow-md rounded-xl flex flex-col text-center hover:shadow-lg transition overflow-hidden"
          >
            <div className="w-full aspect-square overflow-hidden">
              <Image
                src={emp.img}
                alt={t(`introduce.employee.members.${emp.key}.name`)}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-4 md:p-5">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {t(`introduce.employee.members.${emp.key}.role`)}
              </p>
              <h3 className="font-semibold text-lg text-gray-800 mt-1">
                {t(`introduce.employee.members.${emp.key}.name`)}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="w-[80%] border-t border-green-800 mt-4 mx-auto"></div>
    </div>
  );
}
