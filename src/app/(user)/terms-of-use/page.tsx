"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfUsePage() {
  const { t } = useLanguage();

  return (
    <section className="w-full h-full bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b-2 border-green-700 pb-4">
          {t("terms.title")}
        </h1>
        <article className="space-y-6 text-gray-700 leading-relaxed text-justify">
          <p className="text-sm text-gray-500 italic">
            {t("terms.lastUpdated")}
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("terms.section1.title")}
            </h2>
            <p className="text-base">
              {t("terms.section1.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("terms.section2.title")}
            </h2>
            <p className="text-base">
              {t("terms.section2.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("terms.section3.title")}
            </h2>
            <p className="text-base">
              {t("terms.section3.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("terms.section4.title")}
            </h2>
            <p className="text-base">
              {t("terms.section4.content")}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("terms.section5.title")}
            </h2>
            <p className="text-base">
              {t("terms.section5.content")}
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t("terms.acceptance.title")}
            </h2>
            <p className="text-base font-semibold">
              {t("terms.acceptance.content")}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
