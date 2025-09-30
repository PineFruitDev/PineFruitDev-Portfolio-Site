import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PineFruitDev | Full-Stack Developer & Game Development Expert',
  description: 'Professional web development, game development, and Discord bot automation services. Specializing in TypeScript, React, Next.js, and Unreal Engine.',
  keywords: [
    'web development',
    'game development',
    'discord bots',
    'typescript',
    'react',
    'nextjs',
    'unreal engine',
    'full-stack developer',
    'freelance developer',
  ].join(', '),
  authors: [{ name: 'PineFruitDev' }],
  creator: 'PineFruitDev',
  publisher: 'PineFruitDev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PineFruitDev | Full-Stack Developer & Game Development Expert',
    description: 'Professional web development, game development, and Discord bot automation services.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'PineFruitDev Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PineFruitDev Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PineFruitDev | Full-Stack Developer & Game Development Expert',
    description: 'Professional web development, game development, and Discord bot automation services.',
    images: ['/og-image.jpg'],
    creator: '@pinefruitdev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
