import "./global.css";
import type { Metadata } from "next";
import { AOS } from "./components/global";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextapp template.xyz"),
  icons: {
    icon: "/icon.png",
  },
  title: "nextjs template",
  description:
    "I fell in love with next.js, im trying to make a template for it also",
  applicationName: "next Web Application",
  authors: [{ name: "nextapp template", url: "https://domainname.host" }],
  keywords: ["NextJs", "reactjs", "template", "typescript"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AOS />
        {children}
      </body>
    </html>
  );
}
