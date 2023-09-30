import { Card, Title, Text } from '@tremor/react';
// import { fetchAllUsers } from '../pages/api/users/userApi';
import Search from './search';
// import UsersTable from './table';

import { EventProvider } from './data/EventProvider';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const users = await fetchAllUsers();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {/* <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search /> */}
      {/* <Card className="mt-6">
        <UsersTable users={users} />
      </Card> */}
    </main>
  );
}
