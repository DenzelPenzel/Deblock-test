import type { Metadata } from 'next';

import '@rainbow-me/rainbowkit/styles.css';
import '@coinbase/onchainkit/styles.css';
import './global.css'
import dynamic from 'next/dynamic';

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'Swap application',
  description: 'Built with Deblock',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center bg-[#FBFAF9]">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
