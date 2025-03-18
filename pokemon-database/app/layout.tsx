import "./globals.css";
import { Inter } from "next/font/google";
import ReduxProvider from "@/lib/ReduxProvider";
import Navbar from "@/components/Navbar"; // 🚀 Importér Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokémon Database",
  description: "Find information om dine yndlings-Pokémon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar /> {/* 🚀 Navbar vises nu i hele appen */}
          <main className="max-w-4xl mx-auto">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
