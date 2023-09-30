import EmployeeDashboard from './employeeDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import AdminDashboard from './adminDashboard';
import Custom404  from '../pages/404';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {

  const session = await getServerSession(authOptions);
  
  
  return (
    <main>
      {session?.user ? (
        session?.user.isAdmin ? (   // LOGGED IN AS ADMIN
        <AdminDashboard/>
        ) : (   // LOGGED IN AS REGULAR EMPLOYEE
        <EmployeeDashboard/>
        )) : (   // NOT LOGGED IN
        <Custom404/>
      )}

    </main>
  );
}

