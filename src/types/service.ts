export interface Service {
  _id: string;
  title: string;
  description: string;
  content?: string;
  icon?: string;   // icon hiển thị ở trang ngoài
  image?: string;  // ảnh chi tiết (banner bài viết)
  createdAt?: string;
  updatedAt?: string;
}
