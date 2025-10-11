"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IntroducePage() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <p className="text-lg text-gray-700 mb-6">
          {t("introduce.description")}
        </p>
        <div className="flex gap-4">
          <Link
            href="/introduce/company"
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          >
            {t("introduce.aboutCompany")}
          </Link>
          <Link
            href="/introduce/employee"
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
          >
            {t("introduce.aboutTeam")}
          </Link>
        </div>
    </div>
  );
}
