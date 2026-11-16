import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/common/AppShell";

export const metadata: Metadata = {
  title: "오늘구조대",
  description: "내일은 알맞게 만들고, 오늘 남은 빵은 구해요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
