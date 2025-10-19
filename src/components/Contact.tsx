"use client";

import { useState } from "react";
import { Facebook, Linkedin, Mail, MapPin, Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactService } from "@/services/contact.service";
import toast from "react-hot-toast"; // Nếu bạn đã có thư viện này, rất tiện

export default function Contact() {
  const { t } = useLanguage();

  // ✅ State
 const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

  const [loading, setLoading] = useState(false);

  // ✅ Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.fullName || !formData.email || !formData.message) {
    toast.error("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    setLoading(true);
    const res = await contactService.sendMessage({
      ...formData,
      type: "contact", // 🟩 thêm dòng này để phân biệt loại form
    });

    if (res.success) {
      toast.success("Gửi thành công!");
      setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } else {
      toast.error(res.message || "Gửi thất bại!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Không thể gửi email. Vui lòng thử lại sau!");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-100 p-6 sm:p-8 rounded-lg shadow">
          
          {/* Left: Contact Form */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {t("contact.leaveInfo")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <input
                  name="fullName"
                  type="text"
                  placeholder={t("contact.form.name")}
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder={t("contact.form.email")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder={t("contact.form.content")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-green-600 py-2 text-sm sm:text-base resize-none"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input id="newsletter" type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  {t("contact.form.newsletter")}
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#43614B] hover:bg-green-700 text-white font-medium rounded-md shadow transition disabled:opacity-70"
                >
                  {loading ? "Đang gửi..." : t("contact.form.send")}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Map & Info */}
          <div className="space-y-6">
            <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502380289066!2d106.6641!3d10.7722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec9e4a6e0ff%3A0xd2b78e5fcfdf8a9c!2zVHAuIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1672500000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-black" />
                <span>{t("footer.email")}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-black" />
                <span>{t("contact.addressAlt")}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-black text-white rounded-full hover:bg-green-700 transition">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
