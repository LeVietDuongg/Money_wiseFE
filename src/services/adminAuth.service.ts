import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  name?: string;
  role?: string;
  exp: number;
}

const TOKEN_KEY = "admin_access_token";

export const adminAuthService = {
  getAccessToken(): string | null {
    return typeof window !== "undefined"
      ? localStorage.getItem(TOKEN_KEY)
      : null;
  },

  setAccessToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearAccessToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getAdminInfo(): DecodedToken | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  },
};
