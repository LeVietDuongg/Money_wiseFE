// src/app/(user)/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
