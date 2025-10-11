"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Banner from "./components/Banner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section className="bg-white">
      <Banner/>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
      

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              {t("contact.contactInfo")}
            </h3>
            <ul className="space-y-4 text-gray-600 text-sm sm:text-base">
              <li className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-green-600 mt-1 shrink-0" />
                <span>{t("contact.address")}</span>
              </li>
              <li className="flex gap-3 items-center">
           
              </li>
              <li className="flex gap-3 items-center">
                <FaEnvelope className="text-green-600" />
                <span>{t("contact.email")}</span>
              </li>
            </ul>

            {/* Map */}
            <div className="mt-6 h-48 sm:h-64 lg:h-72 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502380289066!2d106.6641!3d10.7722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec9e4a6e0ff%3A0xd2b78e5fcfdf8a9c!2zVHAuIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1672500000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              {t("contact.sendMessage")}
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("contact.form.fullName")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder={t("contact.form.email")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
                />
              </div>
              <input
                type="text"
                placeholder={t("contact.form.phone")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder={t("contact.form.subject")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
              />
              <textarea
                placeholder={t("contact.form.message")}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition text-sm sm:text-base font-medium"
              >
                {t("contact.form.submit")}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 text-xs sm:text-sm text-gray-700 flex flex-col sm:flex-row gap-2 sm:items-center">
          <span className="font-bold text-yellow-600">⚠️ {t("contact.importantNote")}</span>
          <span>
            {t("contact.noteText")}
          </span>
        </div>
      </div>
    </section>
  );
}
