import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/ModalProvider";
import Providers from "@/providers/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Versle",
  description: "A Wordle style game, where you try to guess which book a daily bible verse comes from! 4 tries to guess correctly!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            {children}
            <ModalProvider />
          </Providers>
      </body>
    </html>
  );
}
