"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <section className="w-full h-full bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-2 border-green-700 pb-4">
          {t("privacy.title")}
        </h1>
        <article className="space-y-6 text-gray-700 leading-relaxed text-justify">
          <p className="text-sm text-gray-500 italic">
            {t("privacy.lastUpdated")}
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("privacy.section1.title")}
            </h2>
            <p className="text-base">
              {t("privacy.section1.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("privacy.section2.title")}
            </h2>
            <p className="text-base">
              {t("privacy.section2.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("privacy.section3.title")}
            </h2>
            <p className="text-base">
              {t("privacy.section3.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("privacy.section4.title")}
            </h2>
            <p className="text-base">
              {t("privacy.section4.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("privacy.section5.title")}
            </h2>
            <p className="text-base">
              {t("privacy.section5.content")}
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("privacy.contact.title")}
            </h2>
            <p className="text-base">
              {t("privacy.contact.content")}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
