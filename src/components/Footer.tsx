"use client";

import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../../public/logo_footer.svg";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-r from-[#002D17] via-[#002D18] to-[#2E8B57] text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Grid chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Left - Company Info */}
          <div>
            <div className="flex justify-center md:justify-start">
              <Image alt="Banner" src={Logo} width={150} height={50} />
            </div>
            <p className="text-gray-300 mb-6 mt-4 md:mt-2 max-w-xs mx-auto md:mx-0">
              {t("footer.companyDescription")}
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <FaFacebook className="text-2xl cursor-pointer hover:scale-110 transition" />
              <FaLinkedin className="text-2xl cursor-pointer hover:scale-110 transition" />
              <FaTiktok className="text-2xl cursor-pointer hover:scale-110 transition" />
              <FaYoutube className="text-2xl cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Middle - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">
                {t("footer.service1")}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {t("footer.service2")}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {t("footer.service3")}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {t("footer.service4")}
              </li>
              <li className="hover:text-white transition cursor-pointer">
                {t("footer.service5")}
              </li>
            </ul>
          </div>

          {/* Right - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0" />
                <span>
                  {t("footer.address")}
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaEnvelope className="shrink-0" />
                <span>{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 text-center">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/terms-of-use" className="hover:text-white transition">
              {t("footer.termsOfUse")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
