import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LangProvider } from "@/components/i18n/LangProvider";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const display = Fraunces({
  variable: "--font-display-stack",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uniquehospital.cm"),
  title: {
    default: "Unique Hospital — Service of the Heart",
    template: "%s · Unique Hospital",
  },
  description:
    "Redefining Healthcare Excellence in Cameroon. 24/7 OBGYN, Surgery, Laboratory, Pharmacy, and Community Health — US-standard customer service in Bonaberi-Douala.",
  openGraph: {
    title: "Unique Hospital — Service of the Heart",
    description:
      "International healthcare standards meet local accessibility in Bonaberi-Douala, Cameroon.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangProvider>
          <Navbar />
          <main className="flex-1 pt-3 sm:pt-4">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
