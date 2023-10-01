import Image from "next/image";
import AddEmployeeForm from "../components/addEmployeeForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Custom404 from "../pages/404";

export default async function AddEmployee() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || !session?.user.isAdmin) {
    return <Custom404/>
  }

  return (
    <main className="flex h-screen justify-center bg-gray-100">
        <div className="w-screen items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <AddEmployeeForm/>
        </div>
    </main>
  );
}