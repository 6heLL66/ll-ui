import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/widgets/header/ui';
import { Providers } from './providers';
import { Footer } from '@/widgets/footer/ui';
import '@solana/wallet-adapter-react-ui/styles.css';

  // Define alternative names with typos and spaces
  const alternativeNames = [];

export const metadata: Metadata = {
  title: 'Liqudity Loop',
  description: 'Liqudity Loop is a platform for creating and managing liquidity positions on Meteora.',
  robots: {
    index: true,
    follow: true,
  }
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        {/* <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BeraFlow DAO",
              "alternateName": alternativeNames,
              "url": "https://beraflow.io",
              "logo": "https://beraflow.io/images/logo.jpg",
              "description": "BeraFlow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain."
            })
          }}
        /> */}
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-bg text-foreground-primary relative`}>
        <Providers>
          <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col justify-between">
            <Header />
            {children}
            <Footer />
          </div>

          <canvas id="canvas-club" />
        </Providers>
      </body>
    </html>
  );
}
