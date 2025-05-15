
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ProfileProvider } from '@/contexts/profile-context'; // Added

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'FeastForBeasts - Donate Surplus Food',
  description: 'Connecting food donors with NGOs to fight hunger and reduce food waste.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ProfileProvider> {/* Added ProfileProvider */}
          {children}
        </ProfileProvider>
        <Toaster />
      </body>
    </html>
  );
}
