import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { ProjectExpandProvider } from "@/components/projects/ProjectExpandContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SITE } from "@/constants/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
    type: "website",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
    { media: "(prefers-color-scheme: light)", color: "#030303" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.locale}
      className={`app-html ${geistSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="app-body">
        <div className="app-shell">
          <SmoothScrollProvider>
            <ProjectExpandProvider>{children}</ProjectExpandProvider>
          </SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}
