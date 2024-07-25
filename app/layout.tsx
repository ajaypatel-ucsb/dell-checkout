import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dell Checkout",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="m-auto max-w-[1241px]">
          <div>
            <Image src="/header.png" width={1241} height={728} alt="" />
          </div>
          <div className="grid grid-cols-2">
            <Suspense>
              <div className="px-12">{children}</div>
            </Suspense>
            <div className="bg-[#F6F6F8]"></div>
          </div>
          <div>
            <Image src="/footer.png" width={1241} height={1324} alt="" />
          </div>
        </div>
      </body>
    </html>
  );
}
