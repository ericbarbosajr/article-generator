import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Article Generator",
  description: "A simple article management app using Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}>
        <div className="flex min-h-screen">
          <aside className="w-64 bg-white border-r border-gray-200 p-6">
            <nav>
              <ul className="space-y-4">
                <li className="font-bold text-lg">Article Generator</li>
                <li>
                  <Link
                    href="/home"
                    className="text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600">
                    Articles
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600">
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
