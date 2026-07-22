import type { Metadata, Viewport } from "next";
import "./globals.css";
import MobileFrame from "@/components/MobileFrame";

export const metadata: Metadata = { title: "H2OC Scan" };
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <MobileFrame>{children}</MobileFrame>
      </body>
    </html>
  );
}
