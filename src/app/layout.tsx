import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ClientProviders from '@/components/providers/ClientProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://berlinstore.in'),
  title: {
    default: 'The Berlin Store — Premium Branded Fashion',
    template: '%s | The Berlin Store',
  },
  description: 'Discover the finest branded clothing for men, women, and kids at The Berlin Store. Premium fashion, accessories, and exclusive collections with fast delivery.',
  keywords: ['berlin store', 'branded clothing', 'fashion', 'men clothes', 'women clothes', 'kids fashion', 'accessories', 'premium brands'],
  authors: [{ name: 'The Berlin Store' }],
  creator: 'The Berlin Store',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://berlinstore.in',
    siteName: 'The Berlin Store',
    title: 'The Berlin Store — Premium Branded Fashion',
    description: 'Discover premium branded clothing for men, women, and kids.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Berlin Store' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Berlin Store — Premium Branded Fashion',
    description: 'Discover premium branded clothing for men, women, and kids.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <AuthProvider>
          <ClientProviders>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-inter)',
                },
              }}
            />
          </ClientProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
