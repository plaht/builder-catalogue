import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/materialui';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Builder Catalogue',
  description: 'Build a set from your collection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <ThemeProvider>
          <body className={inter.className}>
            <Navbar />
            <div className="bg-amber-50">{children}</div>
            <Footer />
          </body>
        </ThemeProvider>
      </html>
    </>
  );
}
