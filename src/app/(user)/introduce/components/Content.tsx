"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Content() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800">
          {t("introduce.content.title")}
        </h2>

        {/* Intro */}
        <p className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
          {t("introduce.content.intro1")} <span className="font-semibold text-red-500">{t("introduce.content.intro2")}</span> {t("introduce.content.intro3")}
        </p>

        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
          {t("introduce.content.intro4")}
        </p>

        {/* Location */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
          {t("introduce.content.location1")} <span className="font-semibold">{t("introduce.content.location2")}</span> {t("introduce.content.location3")} <span className="font-semibold">{t("introduce.content.location4")}</span>{t("introduce.content.location5")}
        </p>

        {/* Consulting Areas */}
        <div className="mt-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-left">
            {t("introduce.content.consultingTitle")}
          </h3>
          <ul className="mt-6 space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed list-disc list-inside">
            <li>
              <span className="font-medium">
                {t("introduce.content.consulting1")}
              </span>{" "}
              {t("introduce.content.consulting1Desc")}
            </li>
            <li>
              <span className="font-medium">
                {t("introduce.content.consulting2")}
              </span>{" "}
              {t("introduce.content.consulting2Desc")}
            </li>
            <li>
              <span className="font-medium">{t("introduce.content.consulting3")}</span>{" "}
              {t("introduce.content.consulting3Desc")}
            </li>
            <li>
              <span className="font-medium">
                {t("introduce.content.consulting4")}
              </span>{" "}
              {t("introduce.content.consulting4Desc")}
            </li>
            <li>
              <span className="font-medium">
                {t("introduce.content.consulting5")}
              </span>{" "}
              {t("introduce.content.consulting5Desc")}
            </li>
            <li>
              <span className="font-medium">
                {t("introduce.content.consulting6")}
              </span>{" "}
              {t("introduce.content.consulting6Desc")}
            </li>
          </ul>
        </div>

        {/* Core Values */}
        <div className="mt-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-left">
            {t("introduce.content.coreValuesTitle")}
          </h3>
          <p className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
            {t("introduce.content.coreValuesIntro")}
            <span className="text-red-500 font-semibold">
              {" "}
              {t("introduce.content.coreValuesMotto")}{" "}
            </span>
            {t("introduce.content.coreValuesGuide")}
          </p>
          <ul className="mt-4 space-y-2 text-gray-600 text-sm sm:text-base leading-relaxed list-disc list-inside">
            <li>
              <span className="font-medium">{t("introduce.content.value1")}</span> {t("introduce.content.value1Desc")}
            </li>
            <li>
              <span className="font-medium">{t("introduce.content.value2")}</span> {t("introduce.content.value2Desc")}
            </li>
            <li>
              <span className="font-medium">{t("introduce.content.value3")}</span> {t("introduce.content.value3Desc")}
            </li>
            <li>
              <span className="font-medium">{t("introduce.content.value4")}</span> {t("introduce.content.value4Desc")}
            </li>
          </ul>
        </div>

        <div className="w-full border-t border-green-800 mt-8 mx-auto"></div>
      </div>
    </section>
  );
}
