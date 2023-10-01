"use client";

import { useState } from "react";
import LoadingDots from "./loading-dots";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateUserPassword } from "../../pages/api/userApi";

export default function UpdateForm({userId} : {userId: Number}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (password: String, confirmPassword: String) => {
    try {
      if (password.length < 8) {
        throw new Error("Password should be at least 8 characters.")
      }

      if (password != confirmPassword) {
        throw new Error("Password mismatch!");
      }

      await updateUserPassword(userId, password);
      toast.success("Password updated! Redirecting to dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error : any) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  return (
  <>
    <Toaster position="bottom-center"/>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        handleUpdate(e.currentTarget.password.value, e.currentTarget.confirmPassword.value);
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    > 
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your new password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        </div>
        <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs text-gray-600 uppercase"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Your new password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Update Password</p>
        )}
      </button>
    </form>
    </>
  );
}