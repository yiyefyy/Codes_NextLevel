import Image from "next/image";
import LoginForm from "../components/loginForm";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl mb-10">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
          </Link>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Sign in with your globalpsa account.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
