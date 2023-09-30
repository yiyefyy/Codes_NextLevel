import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {

  const session = await getServerSession(authOptions);
  

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {session?.user ? (
        session?.user.isAdmin ? (   // LOGGED IN AS ADMIN
        <>
          <Text>
            Track all PSA employees here
          </Text>
          <Search />
          <Card className="mt-6">
            <UsersTable users={users} />
          </Card>
        </>
        ) : (   // LOGGED IN AS REGULAR EMPLOYEE
        <Text>
          You do not have permissions to view users.
        </Text>
        )) : (   // NOT LOGGED IN
        <Text>
          Please
          <Link href="/login" className="font-semibold text-gray-800">
          {" "}sign in
          </Link>
        </Text>
      )}

    </main>
  );
}

