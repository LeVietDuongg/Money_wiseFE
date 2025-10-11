# Backend CORS Fix

Thay đổi trong file `app.ts` của backend:

```typescript
// ✅ CORS cấu hình cho phép nhiều origin trong dev
const allowedOrigins = [
  process.env.ADMIN_UI_ORIGIN || "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

Sau đó restart backend server.
