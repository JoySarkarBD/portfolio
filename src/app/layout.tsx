
import type { Metadata } from "next";
import { Madimi_One, Outfit, Ovo } from "next/font/google";
import { ThemeProvider } from "./_components/theme-provider";
import "./globals.css";
const madimi_one = Madimi_One({
  weight: "400",
  variable: "--font-medmi",
  subsets: ["latin"],
});
const outfit = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ovo = Ovo({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Joy Sarkar",
  description: "Showcasing the work of Joy Sarkar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <body
        className={`${outfit.className} ${ovo.className} ${madimi_one.variable} antialiased leading-8 overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
