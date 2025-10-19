# 🚀 Hướng dẫn Deploy lên Vercel

## 📋 Yêu cầu
- Tài khoản Vercel (đăng nhập bằng GitHub)
- Repository đã được push lên GitHub
- Backend đã được deploy trên Render: `https://dudi-moneywise-be.onrender.com`

## ⚙️ Các file đã được cấu hình

### 1. `.env.local` (Local development)
```env
NEXT_PUBLIC_API_URL=https://dudi-moneywise-be.onrender.com/api
```

### 2. `next.config.ts`
- Đã thêm domain backend Render vào `remotePatterns` để cho phép load ảnh từ backend

### 3. `src/services/api.ts`
- Đã cấu hình sử dụng `process.env.NEXT_PUBLIC_API_URL`
- Fallback về `http://localhost:5000/api` nếu không có biến môi trường

## 🔧 Các bước Deploy

### Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

1. **Truy cập Vercel**
   - Vào https://vercel.com
   - Đăng nhập bằng tài khoản GitHub

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Chọn repository: `LeVietDuongg/Money_wiseFE`
   - Click "Import"

3. **Cấu hình Environment Variables**
   - Trong phần "Environment Variables", thêm:
     ```
     Key: NEXT_PUBLIC_API_URL
     Value: https://dudi-moneywise-be.onrender.com/api
     ```
   - Áp dụng cho: Production, Preview, và Development

4. **Deploy**
   - Click "Deploy"
   - Chờ vài phút để Vercel build và deploy

5. **Kiểm tra**
   - Sau khi deploy xong, Vercel sẽ cung cấp URL (ví dụ: `https://money-wise-fe.vercel.app`)
   - Truy cập URL để kiểm tra website

### Cách 2: Deploy qua Vercel CLI

1. **Cài đặt Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variable**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL production
   ```
   - Nhập value: `https://dudi-moneywise-be.onrender.com/api`

5. **Deploy Production**
   ```bash
   vercel --prod
   ```

## 🔍 Kiểm tra sau khi Deploy

1. **Kiểm tra API Connection**
   - Mở Developer Tools (F12)
   - Vào tab Network
   - Kiểm tra xem các API call có gọi đến `https://dudi-moneywise-be.onrender.com` hay không

2. **Kiểm tra các chức năng**
   - Trang chủ
   - Danh sách topics
   - Danh sách posts
   - Admin dashboard (nếu có)
   - Login/Authentication

3. **Kiểm tra Console Errors**
   - Mở Console (F12)
   - Kiểm tra xem có lỗi nào không

## ⚠️ Lưu ý quan trọng

1. **CORS trên Backend**
   - Đảm bảo backend (Render) đã cấu hình CORS cho phép domain của Vercel
   - Thêm domain Vercel vào whitelist CORS trên backend

2. **Environment Variables**
   - File `.env.local` chỉ dùng cho local development
   - Trên Vercel, phải set biến môi trường qua Dashboard hoặc CLI
   - File `.env.local` sẽ KHÔNG được deploy lên Vercel (đã được gitignore)

3. **Image Domains**
   - Đã cấu hình `remotePatterns` trong `next.config.ts`
   - Nếu có domain ảnh mới, cần thêm vào `remotePatterns`

4. **Backend Cold Start (Render Free Tier)**
   - Nếu sử dụng Render free tier, backend có thể bị "sleep" sau 15 phút không hoạt động
   - Lần request đầu tiên có thể mất 30-60s để "wake up"
   - Cân nhắc sử dụng service để ping backend định kỳ (ví dụ: Uptime Robot)

## 🔄 Tự động Deploy

Sau khi cấu hình lần đầu, mỗi khi bạn push code lên GitHub:
- Vercel sẽ tự động build và deploy
- Branch `main` → Production deployment
- Các branch khác → Preview deployment

## 📝 Cập nhật Environment Variables

Nếu cần thay đổi backend URL sau này:

1. Vào Vercel Dashboard
2. Chọn project
3. Settings → Environment Variables
4. Sửa giá trị `NEXT_PUBLIC_API_URL`
5. Redeploy để áp dụng thay đổi

## 🆘 Troubleshooting

### Lỗi API không connect được
- Kiểm tra CORS trên backend
- Kiểm tra environment variable `NEXT_PUBLIC_API_URL` đã được set chưa
- Kiểm tra backend có đang chạy không (truy cập trực tiếp URL backend)

### Lỗi ảnh không hiển thị
- Kiểm tra domain đã được thêm vào `remotePatterns` trong `next.config.ts`
- Kiểm tra URL ảnh có đúng định dạng không

### Build failed
- Kiểm tra logs trên Vercel Dashboard
- Đảm bảo không có TypeScript errors
- Chạy `npm run build` local để test trước

## 📚 Tài liệu tham khảo
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables in Next.js](https://nextjs.org/docs/basic-features/environment-variables)
