import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Custom404  from '../pages/404';
import AddEmployee from './addEmployee';

export const dynamic = 'force-dynamic';

export default async function ManageEventsPage() {

  const session = await getServerSession(authOptions);
  
  return (
    <main>
      {session?.user && session?.user.isAdmin ? (   // LOGGED IN AS ADMIN
        <AddEmployee/>
        ) : (   // NOT LOGGED IN
        <Custom404/>
      )}

    </main>
  );
}

