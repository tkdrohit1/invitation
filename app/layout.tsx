import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/config/wedding.config";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName} — Wedding Invitation`,
  description: `Join us to celebrate the wedding of ${weddingConfig.couple.groom.fullName} and ${weddingConfig.couple.bride.fullName} in ${weddingConfig.couple.city}. RSVP, schedule, and venue details.`,
  openGraph: {
    title: `${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName} | Royal Wedding Invitation`,
    description: `Save the date: ${weddingConfig.couple.displayDate} · ${weddingConfig.couple.city}. Open your personalized invitation.`,
    images: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${greatVibes.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#1a0407] text-[#fcf8f2] font-sans antialiased selection:bg-[#e8c98a] selection:text-[#2b060d]">
        {children}
      </body>
    </html>
  );
}
