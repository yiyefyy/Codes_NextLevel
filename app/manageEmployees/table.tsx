import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
  import { User } from '../../pages/api/userApi';
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  
  export default function UsersTable({ users }: { users: User[] }) {

    const [showUserDetails, setShowUserDetails] = useState(true)
    const router = useRouter()

    const handleNameClick = (id : number) => {
        setShowUserDetails(true)
        router.push(`/employeeDetails?id=${id}`)
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Admin</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
                <TableRow key={user.userId}>
                    <TableCell>
                        <button onClick={() => handleNameClick(user.userId)} className='bg-white text-black hover:bg-[#acc3c3] hover:text-white flex py-1 px-2 items-center justify-center rounded-md border text-sm transition-all focus:outline-none'>
                            {user.firstName} {user.lastName}
                        </button>
                        </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }