"use client";

import { Card, Title, Text } from '@tremor/react';
import { fetchAllUsers } from '../../pages/api/userApi';
import Search from './search';
import UsersTable from './table';
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ManageEmployees({
  searchParams
}: {
  searchParams: { q: string };
}) {

  const router = useRouter();  
  const users = await fetchAllUsers();

  const filteredUsers = searchParams.q 
  ? users.filter(user => {
        const keyword = searchParams.q 
        const firstNameMatch = user.firstName.includes(keyword);
        const lastNameMatch = user.lastName.includes(keyword);
        return firstNameMatch || lastNameMatch;
  })
  : users

  const handleCreateUserClick = () => {
      router.push("/AddEmployee")
  }


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between'>
        <Title>Users</Title>
        <button
                className= "bg-black text-white hover:bg-white hover:text-black flex h-10 px-2 items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                onClick={handleCreateUserClick}
            >
            <p>Add User</p>
        </button>
      </div>
      <Text>
        View and manage the users of Next Level here 
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={filteredUsers} />
      </Card>
    </main>
  );
}