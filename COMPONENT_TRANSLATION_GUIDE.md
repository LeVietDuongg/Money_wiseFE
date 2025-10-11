# Translation Implementation Guide for Remaining Components

## How to Update Each Component

### Pattern for All Components:
1. Add `"use client";` at the top
2. Import the hook: `import { useLanguage } from "@/contexts/LanguageContext";`
3. Use the hook: `const { t } = useLanguage();`
4. Replace hardcoded text with `{t("translation.key")}`

---

## Home Components

### HeroSection.tsx
```tsx
"use client";

import Image from "next/image";
import Card from "@/assets/home/image/banner/Card.svg";
import UserCard from "@/assets/home/image/banner/User.svg";
import People from "@/assets/home/image/banner/People.svg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full mt-8 flex items-center justify-center overflow-hidden rounded-lg relative bg-gradient-to-r from-[#E6F0FF] via-[#FEECEB] to-[#F4E7FF] px-4 md:px-8 lg:px-12 h-auto lg:h-[680px]">
      <div className="flex flex-col lg:flex-row items-center justify-between w-[95%] lg:w-[90%] py-8 gap-8">
        <div className="mx-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 z-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            <span className="text-orange-500">{t("home.hero.title1")} </span>
            {t("home.hero.title2")}
            <br /> {t("home.hero.title3")}
            <span className="text-gray-900">{t("home.hero.title4")}</span>
          </h2>
          <p className="text-gray-900 text-base md:text-lg">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold shadow hover:opacity-90">
              {t("home.hero.startFree")}
            </button>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 text-black font-semibold shadow hover:opacity-90">
              {t("home.hero.bookSession")}
            </button>
          </div>
        </div>
        {/* Keep the rest of the image code unchanged */}
      </div>
    </section>
  );
}
```

### AboutUs.tsx - Key Changes
```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
// ... other imports

export default function AboutUs() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 md:mb-28 text-center text-[#2C3E50]">
          {t("home.aboutUs.title")}
        </h2>
        
        {/* In the Monthly Members box */}
        <p className="text-gray-500 text-xs sm:text-sm font-medium">
          {t("home.aboutUs.monthlyMembers")}
        </p>
        
        {/* In the reviews box */}
        <p className="text-black font-bold text-xs sm:text-sm whitespace-nowrap">
          8000+ {t("home.aboutUs.reviews")}
        </p>
        
        {/* In the description */}
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {t("home.aboutUs.intro")} <span className="font-semibold">{t("home.aboutUs.company")}</span>
          {t("home.aboutUs.description")}
        </p>
        
        <div className="mt-1 text-gray-700 leading-relaxed text-sm sm:text-base space-y-1">
          <p>{t("home.aboutUs.point1")}</p>
          <p>{t("home.aboutUs.point2")}</p>
          <p>{t("home.aboutUs.point3")}</p>
          <p>{t("home.aboutUs.point4")}</p>
        </div>
        
        <button className="mt-6 w-full sm:w-fit px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-base sm:text-lg font-semibold rounded-lg shadow hover:opacity-90 transition">
          {t("home.aboutUs.explore")}
        </button>
      </div>
    </section>
  );
}
```

### WhatWeDo.tsx
```tsx
"use client";

import { Lightbulb, BarChart3, Headphones } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatWeDo() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Lightbulb className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.whatWeDo.service1.title"),
      desc: t("home.whatWeDo.service1.desc"),
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.whatWeDo.service2.title"),
      desc: t("home.whatWeDo.service2.desc"),
    },
    {
      icon: <Headphones className="w-12 h-12 text-indigo-500 mx-auto transition-transform group-hover:scale-110" />,
      title: t("home.whatWeDo.service3.title"),
      desc: t("home.whatWeDo.service3.desc"),
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {t("home.whatWeDo.title")}
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          {t("home.whatWeDo.subtitle")}
        </p>
        {/* Map through services array */}
      </div>
    </section>
  );
}
```

### BannerBottom.tsx
```tsx
"use client";

import Image from "next/image";
import Banner1 from "@/assets/home/image/banner/banner1.svg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BannerBottom() {
  const { t } = useLanguage();
  
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
      <Image alt="Banner Bottom" src={Banner1} fill priority className="object-cover brightness-90" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-2xl w-full">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-snug">
            {t("home.bannerBottom.title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            {t("home.bannerBottom.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder={t("home.bannerBottom.placeholder")}
              className="flex-1 px-4 py-3 text-gray-700 focus:outline-none text-sm sm:text-base"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-[#247749] text-white font-semibold hover:opacity-90 transition text-sm sm:text-base">
              {t("home.bannerBottom.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### ContactUs.tsx (in home folder)
```tsx
"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactUs() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          {t("home.contactUs.title")}
        </h2>
        <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
          {t("home.contactUs.subtitle")}
        </p>
        
        {/* Contact Info section */}
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          {t("contact.contactInfo")}
        </h3>
        
        {/* Use translation keys for address, phone, email */}
        <span>{t("contact.address")}</span>
        <span>{t("contact.phone")}</span>
        <span>{t("contact.email")}</span>
        
        {/* Form section */}
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          {t("contact.sendMessage")}
        </h3>
        
        {/* Use form translation keys */}
        <input placeholder={t("contact.form.fullName")} />
        <input placeholder={t("contact.form.email")} />
        <input placeholder={t("contact.form.phone")} />
        <input placeholder={t("contact.form.subject")} />
        <textarea placeholder={t("contact.form.message")} />
        <button>{t("contact.form.submit")}</button>
        
        {/* Important note */}
        <span className="font-bold text-yellow-600">⚠️ {t("contact.importantNote")}</span>
        <span>{t("contact.noteText")}</span>
      </div>
    </section>
  );
}
```

### Testimonials.tsx
```tsx
"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      content: t("home.testimonials.testimonial1.content"),
      name: t("home.testimonials.testimonial1.name"),
      title: t("home.testimonials.testimonial1.title"),
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      content: t("home.testimonials.testimonial2.content"),
      name: t("home.testimonials.testimonial2.name"),
      title: t("home.testimonials.testimonial2.title"),
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      content: t("home.testimonials.testimonial3.content"),
      name: t("home.testimonials.testimonial3.name"),
      title: t("home.testimonials.testimonial3.title"),
      avatar: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          {t("home.testimonials.title")}
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          {t("home.testimonials.subtitle")}
        </p>
        {/* Map testimonials */}
      </div>
    </section>
  );
}
```

### FeaturedNews.tsx
```tsx
"use client";

import Image from "next/image";
import sampleImg from "@/assets/home/image/custom/featuredNews.svg";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FeaturedNews() {
  const { t } = useLanguage();
  
  const news = [
    {
      title: t("home.featuredNews.news1.title"),
      category: t("home.featuredNews.news1.category"),
      desc: t("home.featuredNews.news1.desc"),
      img: sampleImg,
    },
    {
      title: t("home.featuredNews.news2.title"),
      category: t("home.featuredNews.news2.category"),
      desc: t("home.featuredNews.news2.desc"),
      img: sampleImg,
    },
    {
      title: t("home.featuredNews.news3.title"),
      category: t("home.featuredNews.news3.category"),
      desc: t("home.featuredNews.news3.desc"),
      img: sampleImg,
    },
    {
      title: t("home.featuredNews.news4.title"),
      category: t("home.featuredNews.news4.category"),
      desc: t("home.featuredNews.news4.desc"),
      img: sampleImg,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("home.featuredNews.title")}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t("home.featuredNews.subtitle")}
          </p>
        </div>
        {/* Map news items */}
        <a href="#" className="inline-block mt-2 text-blue-600 font-medium hover:underline">
          {t("home.featuredNews.readMore")}
        </a>
      </div>
    </section>
  );
}
```

---

## Introduce Components

### introduce/page.tsx
```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function IntroducePage() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <p className="text-lg text-gray-700 mb-6">
        {t("introduce.page.overview")}
      </p>
      <div className="flex gap-4">
        <Link href="/introduce/company" className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
          {t("introduce.page.aboutCompany")}
        </Link>
        <Link href="/introduce/employee" className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
          {t("introduce.page.aboutTeam")}
        </Link>
      </div>
    </div>
  );
}
```

### introduce/components/Content.tsx
```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Content() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800">
          {t("introduce.company.title")}
        </h2>
        
        <p className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
          {t("introduce.company.intro1")} <span className="font-semibold">{t("introduce.company.intro2")}</span> {t("introduce.company.intro3")}
        </p>
        
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
          {t("introduce.company.intro4")}
        </p>
        
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
          {t("introduce.company.location1")} <span className="font-semibold">{t("introduce.company.location2")}</span> {t("introduce.company.location3")} <span className="font-semibold">{t("introduce.company.location4")}</span>{t("introduce.company.location5")}
        </p>
        
        <div className="mt-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-left">
            {t("introduce.company.consultingTitle")}
          </h3>
          <ul className="mt-6 space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed list-disc list-inside">
            <li><span className="font-medium">{t("introduce.company.consulting1")}</span> {t("introduce.company.consulting1Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.consulting2")}</span> {t("introduce.company.consulting2Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.consulting3")}</span> {t("introduce.company.consulting3Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.consulting4")}</span> {t("introduce.company.consulting4Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.consulting5")}</span> {t("introduce.company.consulting5Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.consulting6")}</span> {t("introduce.company.consulting6Desc")}</li>
          </ul>
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-left">
            {t("introduce.company.coreValuesTitle")}
          </h3>
          <p className="mt-6 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
            {t("introduce.company.coreValuesIntro")}
            <span className="text-red-500 font-semibold"> {t("introduce.company.coreValuesMotto")} </span>
            {t("introduce.company.coreValuesGuide")}
          </p>
          <ul className="mt-4 space-y-2 text-gray-600 text-sm sm:text-base leading-relaxed list-disc list-inside">
            <li><span className="font-medium">{t("introduce.company.value1")}</span> {t("introduce.company.value1Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.value2")}</span> {t("introduce.company.value2Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.value3")}</span> {t("introduce.company.value3Desc")}</li>
            <li><span className="font-medium">{t("introduce.company.value4")}</span> {t("introduce.company.value4Desc")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

---

## Other Components

### community/page.tsx
```tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function CommunityPage() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl font-bold text-center mt-10">
        {t("community.title")}
      </h1>
    </div>
  );
}
```

### Footer.tsx
```tsx
"use client";

import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../../public/logo_footer.svg";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-r from-[#002D17] via-[#002D18] to-[#2E8B57] text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start">
              <Image alt="Banner" src={Logo} width={150} height={50} />
            </div>
            <p className="text-gray-300 mb-6 mt-4 md:mt-2 max-w-xs mx-auto md:mx-0">
              {t("footer.tagline")}
            </p>
            {/* Social icons */}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.servicesTitle")}</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">{t("footer.service1")}</li>
              <li className="hover:text-white transition cursor-pointer">{t("footer.service2")}</li>
              <li className="hover:text-white transition cursor-pointer">{t("footer.service3")}</li>
              <li className="hover:text-white transition cursor-pointer">{t("footer.service4")}</li>
              <li className="hover:text-white transition cursor-pointer">{t("footer.service5")}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contactTitle")}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaPhoneAlt className="shrink-0" />
                <span>{t("footer.phone")}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <FaEnvelope className="shrink-0" />
                <span>{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 text-center">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Quick Implementation Steps

1. **Copy the code samples** for each component from this guide
2. **Replace the entire file** with the new version
3. **Test** by switching languages in the header
4. **All translation keys are already in** `/src/i18n/locales/en/translation.json` and `/src/i18n/locales/vi/translation.json`

## Notes
- All components MUST have `"use client";` at the top since they use React hooks
- Always import `{ useLanguage }` from `"@/contexts/LanguageContext"`
- Always call `const { t } = useLanguage();` at the start of the component
- Replace ALL hardcoded text with `{t("key.path")}`
