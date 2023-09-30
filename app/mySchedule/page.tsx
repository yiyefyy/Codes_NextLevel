import Schedule from './schedule';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Custom404  from '../pages/404';

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {

  const session = await getServerSession(authOptions);
  
  return (
    <main>
      {session?.user && !session?.user.isAdmin ? (   // LOGGED IN AS ADMIN
        <Schedule/>
        ) : (   // NOT LOGGED IN
        <Custom404/>
      )}

    </main>
  );
}

