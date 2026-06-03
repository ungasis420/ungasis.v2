import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNGASIS Dashboard",
  description: "UNGASIS OS v5.0 JARVIS Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
