import api from "./api";

export const contactService = {
  /** Gửi form liên hệ hoặc newsletter */
  sendMessage: async (data: {
    fullName?: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
    type: "contact" | "newsletter";
  }) => {
    const res = await api.post("/contact", data);
    return res.data;
  },
};
