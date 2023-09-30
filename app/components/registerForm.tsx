"use client";

import { useState } from "react";
import LoadingDots from "./loading-dots";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createUser, User } from "../../pages/api/users/userApi";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import Link from "next/link";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser]= useState<User>({
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    designation: "",
    password: "",
    isAdmin: "false"
  });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setUser({ ...user, [fieldName]: e.target.value })
    };

  const handleRegister = async (user : User) => {
    try {
      user.isAdmin = `${isAdmin}`;
      await createUser(user);
      setLoading(false);
      setIsAdmin(false);
      toast.success("Account created! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
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
        handleRegister(user);
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
    <div>
        <label
          htmlFor="userId"
          className="block text-xs text-gray-600 uppercase"
        >
          Employee ID
        </label>
        <input
          id="userId"
          name="userId"
          type="number"
          placeholder="12345"
          required
          onChange={e => handleChange(e, "userId")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div className="flex space-x-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-xs text-gray-600 uppercase"
        >
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Jane"
          required
          onChange={e => handleChange(e, "firstName")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-xs text-gray-600 uppercase"
        >
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Smith"
          required
          onChange={e => handleChange(e, "lastName")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="janesmith@globalpsa.com"
          autoComplete="email"
          required
          onChange={e => handleChange(e, "email")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="department"
          className="block text-xs text-gray-600 uppercase"
        >
          Department
        </label>
        <input
          id="department"
          name="department"
          type="text"
          placeholder="Operations"
          required
          onChange={e => handleChange(e, "department")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>      
      <div>
        <label
          htmlFor="designation"
          className="block text-xs text-gray-600 uppercase"
        >
          Designation
        </label>
        <input
          id="designation"
          name="designation"
          type="text"
          placeholder="Operations Supervisor"
          required
          onChange={e => handleChange(e, "designation")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
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
          required
          onChange={e => handleChange(e, "password")} 
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div className="flex space-x-4 justify-center items-center">
        <label
          htmlFor="isAdmin"
          className="block text-xs text-gray-600 uppercase"
        >
          Grant admin rights?
        </label>
        <ToggleButton
          value="check"
          selected={isAdmin}
          onChange={() => {
            setIsAdmin(!isAdmin);
          }}
          style={{ width: '20px', height: '20px' }}
        >
          <CheckIcon style={{ fontSize: '15px' }}  />
        </ToggleButton>
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
          <p>Add Employee</p>
        )}
      </button>
      <p className="text-center text-sm text-gray-600">
        Not an Admin?
        <Link href="/login" className="font-semibold text-gray-800">
         {" "}Login instead
        </Link>
      </p>
    </form>
    </>
  );
}