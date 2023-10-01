import EmployeeDashboard from './employeeDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import AdminDashboard from './adminDashboard';
import Custom404  from '../pages/404';
import { Title } from '@tremor/react';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {

  const session = await getServerSession(authOptions);
  
  
  return (
    <main>
      {session?.user ? (
        <>
        <Title className="md:pl-10 md:pt-10 text-xl font-semibold">Welcome, {session?.user.firstName}</Title>

        { session?.user.isAdmin ? (   // LOGGED IN AS ADMIN
        <AdminDashboard/>
        ) : (   // LOGGED IN AS REGULAR EMPLOYEE
        <EmployeeDashboard userId={session?.user.userId}/>
        )}
        </>
        ) : (   // NOT LOGGED IN
        <Custom404/>
      )}

    </main>
  );
}

