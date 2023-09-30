import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import Sidebar from './sidebar';
import { EventProvider } from './data/EventProvider';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50 overflow-hidden">
      <body className="h-full">
        <div className="sticky top-0 z-50">
          <Suspense>
            <Nav />
          </Suspense>
        </div>
        <div className="flex h-full">
          <div className="overflow-hidden">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-y-auto">
            {' '}
            <EventProvider>{children}</EventProvider>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
