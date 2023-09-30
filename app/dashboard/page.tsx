import EmployeeDashboard from './employeeDashboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import AdminDashboard from './adminDashboard';
import PageNotFound from '../loggedOut';

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
        <PageNotFound/>
      )}

    </main>
  );
}
