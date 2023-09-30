import { Card, Title, Text } from '@tremor/react';
import { fetchAllUsers } from '../pages/api/users/userApi';
import Search from './search';
import UsersTable from './table';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

  const session = await getServerSession(authOptions);
  
  const search = searchParams.q ?? '';
  const users = await fetchAllUsers();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* <Title>Users</Title> */}
      <Title>Welcome, {session?.user.firstName}</Title>
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
          Please sign in.
        </Text>
      )}

    </main>
  );
}

