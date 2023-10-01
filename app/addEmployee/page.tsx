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
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Add Employee</h3>
        </div>
        <AddEmployeeForm/>
      </div>
    </main>
  );
}