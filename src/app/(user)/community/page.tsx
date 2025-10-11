"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function CommunityPage() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full h-full">
        <h1 className="text-3xl font-bold text-center mt-10">{t("community.title")}</h1>
    </div>
  );
}
