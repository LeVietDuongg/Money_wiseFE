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
        { name: t("header.clauses"), path: "/introduce/clauses" },
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
      className={`w-full z-50 transition-all duration-700 ease-in-out
      ${isScrolled ? "fixed top-0 bg-white shadow-md" : "relative bg-transparent"}`}
    >
      <div className="flex flex-col w-full">
        {/* Tầng 1: Menu + Language */}
        <div 
          className={`w-full flex items-center px-6 md:px-12 transition-all duration-700 ease-in-out relative
          ${isScrolled ? "py-6" : "py-3"}`}
        >
          {/* Container cho menu - luôn cố định vị trí, nhưng bị đẩy khi logo xuất hiện */}
          <div className={`flex items-center w-full transition-all duration-700 ease-in-out
          ${isScrolled ? "ml-[300px] justify-between" : "ml-0 justify-between"}`}>
            <nav className={`flex items-center`}>
              {/* Desktop Menu */}
              <div className="hidden md:flex gap-6 lg:gap-8 items-center text-sm">
                {menuItems.map((item) => {
                  const isActive = (() => {
                    if (item.path === "/") {
                      return pathname === "/" || pathname === "/home";
                    }
                    if (item.children) {
                      return item.children.some(
                        (child) => child.path && pathname.startsWith(child.path)
                      );
                    }
                    if (item.path) {
                      return pathname.startsWith(item.path);
                    }
                    return false;
                  })();

                  return item.children ? (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className={`font-semibold flex items-center gap-1 cursor-pointer hover:text-green-700 transition-colors relative ${
                          isActive ? "text-green-800" : "text-gray-800"
                        }`}
                      >
                        {item.name} <ChevronDown size={16} />
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-800"></span>
                        )}
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute left-0 top-full pt-2 w-52 z-50">
                          <div className="bg-white border border-gray-200 rounded shadow-lg flex flex-col py-2 transition-all duration-300">
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
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.path!}
                      className={`font-semibold hover:text-green-700 transition-colors relative ${
                        isActive ? "text-green-800" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-800"></span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center ml-auto">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </nav>

            {/* Language Dropdown - Bên phải */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
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
              <div className="md:hidden flex items-center ml-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Logo nhỏ - absolute position, đẩy vào từ trái khi scroll */}
          <Link 
            href="/" 
            className={`absolute left-6 md:left-12 top-0 bottom-0 flex items-center transition-all duration-700 ease-in-out overflow-hidden
            ${isScrolled ? "w-[240px] opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
          >
            <Image 
              src={LogoSmall} 
              alt="Logo" 
              width={140} 
              height={140}
              className="transition-all duration-700 ease-in-out"
            />
          </Link>
        </div>

        {/* Đường kẻ ngang - ẩn khi scroll */}
          <div 
            className={`w-full px-6 md:px-12 transition-all duration-700 ease-in-out overflow-hidden
            ${isScrolled ? "max-h-0 opacity-0" : "max-h-[1px] opacity-100"}`}
          >
            <div className="border-t border-gray-300"></div>
          </div>

          {/* Tầng 2: Logo lớn - ẩn khi scroll */}
          <div 
            className={`w-full px-6 md:px-12 transition-all duration-700 ease-in-out overflow-hidden
            ${isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-[400px] py-8 opacity-100"}`}
          >
            <Link href="/" className="inline-flex items-center">
              <Image 
                src={Logo} 
                alt="Logo" 
                width={280} 
                height={280}
                className="transition-all duration-700 ease-in-out"
              />
            </Link>
          </div>
        </div>

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