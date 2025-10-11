"use client";

import { notFound } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Banner from "./components/Banner";
import Employee from "./components/Employee";
import DifferentEmployee from "./components/DifferentEmployee";
import MTP from "../../../../../../public/mtp.svg";

// Helper function to get translated employees
const getEmployees = (t: (key: string) => string) => [
  {
    id: "Larry-Truong",
    key: "larry-truong",
    name: t("introduce.employee.members.larry-truong.name"),
    role: t("introduce.employee.members.larry-truong.role"),
    img: MTP,
    bio: t("introduce.employee.members.larry-truong.bio"),
  },
  {
    id: "tran-thi-b",
    key: "tran-thi-b",
    name: t("introduce.employee.members.tran-thi-b.name"),
    role: t("introduce.employee.members.tran-thi-b.role"),
    img: MTP,
    bio: t("introduce.employee.members.tran-thi-b.bio"),
  },
  {
    id: "le-van-c",
    key: "le-van-c",
    name: t("introduce.employee.members.le-van-c.name"),
    role: t("introduce.employee.members.le-van-c.role"),
    img: MTP,
    bio: t("introduce.employee.members.le-van-c.bio"),
  },
  {
    id: "pham-thi-d",
    key: "pham-thi-d",
    name: t("introduce.employee.members.pham-thi-d.name"),
    role: t("introduce.employee.members.pham-thi-d.role"),
    img: MTP,
    bio: t("introduce.employee.members.pham-thi-d.bio"),
  },
  {
    id: "hoang-van-e",
    key: "hoang-van-e",
    name: t("introduce.employee.members.hoang-van-e.name"),
    role: t("introduce.employee.members.hoang-van-e.role"),
    img: MTP,
    bio: t("introduce.employee.members.hoang-van-e.bio"),
  },
];

export default function EmployeeDetail({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const employees = getEmployees(t);
  const emp = employees.find((e) => e.id === params.id);

  if (!emp) return notFound();

  return (
    <div className="w-full h-full">
      <Banner />
      <Employee emp={emp} />
      <DifferentEmployee employees={employees} />
    </div>
  );
}
