"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/Logo.svg";
import LogoSmall from "../../public/Logo_left.svg";
import FlagVN from "../../public/vietnam.png";
import FlagEN from "../../public/english.png";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaFacebook, FaYoutube, FaLinkedin, FaTiktok } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
type MenuChild = {
  name: string;
  path: string;
  icon?: React.ReactNode;
};

type MenuItem = {
  name: string;
  key: string;
  path?: string;
  children?: MenuChild[];
};

  const menuItems: MenuItem[] = [
    { name: t("header.home"), key: "home", path: "/" },
    {
      name: t("header.introduce"),
      key: "introduce",
      path: "/introduce",
      children: [
        { name: t("header.company"), path: "/introduce/company" },
        { name: t("header.employee"), path: "/introduce/employee" },
      ],
    },
    {
      name: t("header.topic"),
      key: "topic",
      children: [
        { name: t("header.whereMoney"), path: "/topic/where-money" },
        { name: t("header.retire55"), path: "/topic/retire-55" },
        { name: t("header.lifetimeMoney"), path: "/topic/lifetime-money" },
      ],
    },
    { name: t("header.service"), key: "service", path: "/service" },
    {
      name: t("header.community"),
      key: "community",
      path: "/community",
      children: [
        {
          name: "Facebook",
          path: "https://facebook.com",
          icon: <FaFacebook className="text-blue-600" />,
        },
        {
          name: "YouTube",
          path: "https://youtube.com",
          icon: <FaYoutube className="text-red-600" />,
        },
        {
          name: "LinkedIn",
          path: "https://linkedin.com",
          icon: <FaLinkedin className="text-blue-700" />,
        },
        {
          name: "TikTok",
          path: "https://tiktok.com",
          icon: <FaTiktok className="text-black" />,
        },
      ],
    },
    { name: t("header.contact"), key: "contact", path: "/contact" },
  ];

  const handleLanguageChange = (lang: "en" | "vi") => {
    setLanguage(lang);
    setIsOpenLang(false);
  };

  // click outside cho language
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsOpenLang(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // scroll effect tối ưu với requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full flex flex-col items-center z-50 transition-all duration-500 ease-in-out
      ${isScrolled ? "fixed top-0 bg-white shadow-md py-2" : "relative bg-transparent"}`}
    >
      {!isScrolled && (
        <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
          <Image src={Logo} alt="Logo" width={360} height={360} />
        </div>
      )}
      {!isScrolled && (
        <div className="w-[85%] border-t border-green-800 transition-all duration-500 ease-in-out"></div>
      )}

      <nav
        className={`transition-all duration-500 ease-in-out
        ${isScrolled
          ? "w-[90%] flex items-center justify-around py-2"
          : "w-[85%] flex items-center justify-center py-4"
        }`}
      >
        {isScrolled && (
          <div className="hidden md:flex items-center transition-all duration-500 ease-in-out">
            <Image src={LogoSmall} alt="Logo Small" width={200} height={200} />
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {menuItems.map((item) => {
            const isActive =
              item.path
                ? pathname === item.path
                : item.children?.some((child) =>
                    pathname.startsWith(child.path)
                  );

            return item.children ? (
              <div key={item.name} className="relative">
                <button
                  className={`font-semibold flex items-center gap-1 cursor-pointer hover:text-green-700 transition-colors ${
                    isActive ? "text-green-800" : "text-gray-800"
                  }`}
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                >
                  {item.name} <ChevronDown size={16} />
                </button>
                {openDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow-lg flex flex-col pt-2 pb-2 z-50 transition-all duration-300">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.path}
                        target={child.path.startsWith("http") ? "_blank" : "_self"}
                        className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 whitespace-nowrap ${
                          pathname === child.path
                            ? "font-semibold text-green-800"
                            : ""
                        }`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.icon && <span>{child.icon}</span>}
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path!}
                className={`font-semibold hover:text-green-700 transition-colors ${
                  isActive ? "text-green-800" : "text-gray-800"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center gap-1"
              onClick={() => setIsOpenLang(!isOpenLang)}
            >
              <Image
                src={language === "vi" ? FlagVN : FlagEN}
                alt={language === "vi" ? "VN" : "EN"}
                width={24}
                height={24}
              />
              <ChevronDown size={16} />
            </button>
            {isOpenLang && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg flex flex-col transition-all duration-300 z-50">
                <button
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left"
                  onClick={() => handleLanguageChange("vi")}
                >
                  <Image src={FlagVN} alt="VN" width={20} height={20} />
                  {t("header.language.vietnamese")}
                </button>
                <button
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-left"
                  onClick={() => handleLanguageChange("en")}
                >
                  <Image src={FlagEN} alt="EN" width={20} height={20} />
                  {t("header.language.english")}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white shadow-lg px-6 py-4 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          {menuItems.map((item) =>
            item.children ? (
              <div key={item.name} className="flex flex-col">
                <button
                  className="flex items-center justify-between font-semibold text-gray-800"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.name ? null : item.name)
                  }
                >
                  {item.name} <ChevronDown size={16} />
                </button>
                {openDropdown === item.name && (
                  <div className="ml-4 mt-2 flex flex-col gap-2 transition-all duration-300">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.path}
                        target={child.path.startsWith("http") ? "_blank" : "_self"}
                        className={`flex items-center gap-2 text-gray-600 hover:text-green-700 ${
                          pathname === child.path
                            ? "font-semibold text-green-800"
                            : ""
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {child.icon && <span>{child.icon}</span>}
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.path!}
                className={`font-semibold hover:text-green-700 transition-colors ${
                  pathname === item.path ? "text-green-800" : "text-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}