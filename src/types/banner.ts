export interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  link?: string;
  position: "home" | "service" | "about" | "custom";
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
