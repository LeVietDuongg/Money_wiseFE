"use client";

import { FaMapMarkerAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactUs() {
  const { t } = useLanguage();
  
  return (
    <section id="contact-us" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-center text-gray-800 mb-3">
          {t("home.contactUs.title")}
        </h2>
        <p className="text-gray-600 text-center mt-2 text-base sm:text-lg font-light max-w-2xl mx-auto">
          {t("home.contactUs.subtitle")}
        </p>

        {/* Large Card Container */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-gray-200">
            
            {/* Left - Contact Info */}
            <div className="p-8 sm:p-10 lg:p-12 bg-white">
              <h3 className="text-2xl sm:text-3xl  font-semibold mb-6 text-gray-800">
                {t("home.contactUs.contactInfo")}
              </h3>
              
              <ul className="space-y-5 text-gray-700 text-sm sm:text-base mb-8">
                <li className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-full bg-[#4a634e]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4a634e]/20 transition-colors">
                    <FaMapMarkerAlt className="text-[#4a634e] text-lg" />
                  </div>
                  <span className="pt-2 leading-relaxed">{t("home.contactUs.address")}</span>
                </li>
                <li className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-full bg-[#4a634e]/10 flex items-center justify-center shrink-0 group-hover:bg-[#4a634e]/20 transition-colors">
                    <FaEnvelope className="text-[#4a634e] text-lg" />
                  </div>
                  <span className="pt-2 leading-relaxed">{t("home.contactUs.email")}</span>
                </li>
              </ul>

              {/* Map - Tùy chỉnh và nhỏ hơn */}
              <div className="mt-8 h-52 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502380289066!2d106.6641!3d10.7722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec9e4a6e0ff%3A0xd2b78e5fcfdf8a9c!2zVHAuIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1672500000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="p-8 sm:p-10 lg:p-12 bg-white">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
                {t("home.contactUs.formTitle")}
              </h3>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      placeholder={t("home.contactUs.form.fullName")}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a634e] focus:border-transparent text-sm sm:text-base bg-gray-50/50 transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t("home.contactUs.form.email")}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a634e] focus:border-transparent text-sm sm:text-base bg-gray-50/50 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <input
                  type="tel"
                  placeholder={t("home.contactUs.form.phone")}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a634e] focus:border-transparent text-sm sm:text-base bg-gray-50/50 transition-all placeholder:text-gray-400"
                />
                
                {/* Dropdown cho Chủ đề */}
                <select
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a634e] focus:border-transparent text-sm sm:text-base bg-gray-50/50 transition-all text-gray-700 cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>{t("home.contactUs.form.subject")}</option>
                  <option value="consultation">{t("home.contactUs.form.topics.consultation") || "Tư vấn tài chính"}</option>
                  <option value="investment">{t("home.contactUs.form.topics.investment") || "Đầu tư"}</option>
                  <option value="retirement">{t("home.contactUs.form.topics.retirement") || "Kế hoạch nghỉ hưu"}</option>
                  <option value="insurance">{t("home.contactUs.form.topics.insurance") || "Bảo hiểm"}</option>
                  <option value="other">{t("home.contactUs.form.topics.other") || "Khác"}</option>
                </select>
                
                <textarea
                  placeholder={t("home.contactUs.form.message")}
                  rows={5}
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a634e] focus:border-transparent text-sm sm:text-base bg-gray-50/50 transition-all placeholder:text-gray-400 resize-none"
                ></textarea>
                
                {/* Nút bấm dạng viên thuốc với icon */}
                <button
                  type="submit"
                  className="w-full bg-[#4a634e] text-white py-4 px-8 rounded-full hover:bg-[#3d5240] transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  <span>{t("home.contactUs.form.submit")}</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note - Đặt ra ngoài container để tràn full width */}
      <div className="mt-8">
        <div className="bg-gray-100 border-l-4 border-gray-400 rounded-r-xl p-6 sm:p-8 text-sm sm:text-base text-gray-700 flex flex-col sm:flex-row gap-3 sm:items-center shadow-sm">
          <span className="font-serif font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            {t("home.contactUs.note.title")}
          </span>
          <span className="text-gray-600 leading-relaxed">
            {t("home.contactUs.note.message")}
          </span>
        </div>
      </div>
    </section>
  );
}
