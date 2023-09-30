import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from './login/page';
import Dashboard from './dashboard/page';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {

  const session = await getServerSession(authOptions);
  

  return (
    <main>
      {session?.user ? (
        <Dashboard/>
      ) : (   // NOT LOGGED IN
        <Login/>
      )}

    </main>
  );
}

