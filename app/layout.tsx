import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import Sidebar from './sidebar';
import { EventProvider } from './data/EventProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const metadata = {
  title: 'Next Level - PSA',
  description:
    '(Some description).'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

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
            { session?.user ? (
              <Sidebar isAdmin={session?.user.isAdmin}/>
            ) :
              <></>
            }
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
