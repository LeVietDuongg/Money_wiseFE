import { adminAuthService } from "@/services/adminAuth.service";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    adminAuthService.clearAccessToken();
    router.push("/admin/auth/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
