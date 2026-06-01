import type { Metadata, Viewport } from "next";
import { ProjectExpandProvider } from "@/components/projects/ProjectExpandContext";
import { SITE } from "@/constants/site";
import "./globals.css";

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
    card: "summary",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.locale} className="app-html">
      <body>
        <ProjectExpandProvider>{children}</ProjectExpandProvider>
      </body>
    </html>
  );
}
