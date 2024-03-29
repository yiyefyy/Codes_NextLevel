import Image from "next/image";
import UpdateForm from "../components/updateForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Custom404 from "../pages/404";

export default async function UpdatePassword() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (<Custom404/>);
  }

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Update Password</h3>
        </div>
        <UpdateForm userId={session?.user.userId} />
      </div>
    </main>
  );
}