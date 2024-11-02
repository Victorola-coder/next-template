import "./global.css";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { AOS } from "./components/global";
import { Inter, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextapptemplate.xyz"),
  icons: {
    icon: "/icon.png",
  },
  title: "nextjs template",
  description:
    "I fell in love with next.js, im trying to make a template for it also",
  applicationName: "next Web Application",
  authors: [{ name: "nextapp template", url: "https://scoota.io" }],
  creator: "VickyJay",
  publisher: "VickyJay",
  generator: "Next.js",
  referrer: "origin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://domainname.host",
    title: "Nextjs template",
    siteName: "nextapp template",
    locale: "en_US",
    images: [
      {
        url: "linktoopengraphimage.cdn",
        width: 1200,
        height: 630,
        alt: "next OG Image",
      },
    ],
  },
  twitter: {
    site: "nextapp",
    creator: "socialmediahandle",
    title:
      "nextapp template - I fell in love with next.js, im trying to make a template for it tooo",
    description:
      "I fell in love with next.js, im trying to make a template for it too",
    card: "summary_large_image",
    images: ["linktoopengraph.com"],
  },
  appleWebApp: {
    capable: true,
    title: "nextapp template",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  abstract:
    "I fell in love with next.js, im trying to make a template for it tooo",
  category: "Social",
  classification: "Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "antialiased",
          inter.variable,
          dmSans.className,
          plusJakartaSans.variable
        )}
      >
        <AOS />
        {children}
      </body>
    </html>
  );
}
