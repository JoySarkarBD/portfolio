import type { Metadata } from "next";
import { Madimi_One } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import "./globals.css";
const madimi_one = Madimi_One({
  weight: "400",
  variable: "--font-medmi",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Joy Sarkar",
  description: "Showcasing the work of Joy Sarkar",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/android-icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-icon-144x144.png", type: "image/png", sizes: "144x144" },
      { url: "/android-icon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/android-icon-72x72.png", type: "image/png", sizes: "72x72" },
      { url: "/android-icon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/android-icon-36x36.png", type: "image/png", sizes: "36x36" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <body
        className={`${madimi_one.variable} antialiased leading-8 overflow-x-hidden`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
