import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Custom404  from '../pages/404';
import ManageEmployees from './manageEmployees';

export const dynamic = 'force-dynamic';

export default async function ManageEventsPage() {

  const session = await getServerSession(authOptions);
  
  return (
    <main>
      {session?.user && session?.user.isAdmin ? (   // LOGGED IN AS ADMIN
        <ManageEmployees searchParams = {{q: ""}}/>
        ) : (   // NOT LOGGED IN
        <Custom404/>
      )}

    </main>
  );
}

