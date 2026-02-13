import type { Metadata } from "next";
// Import font chữ Quicksand siêu dễ thương
import { Quicksand } from "next/font/google";
import "./globals.css";
import Background from "../components/Background";

// Cấu hình font chữ hỗ trợ tiếng Việt
const quicksand = Quicksand({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Góc nhỏ của Vy 💖",
  description: "Một nơi lưu giữ kỷ niệm của chúng mình",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* Gắn font chữ vào toàn bộ trang web */}
      <body className={quicksand.className}>
        <Background>{children}</Background>
      </body>
    </html>
  );
}
