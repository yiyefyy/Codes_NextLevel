"use client";

import Image from "next/image";
import AddUserForm from "../components/addUserForm";
import Link from "next/link";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function AddEmployee() {

  return (
    <main className="flex h-screen justify-center bg-gray-100">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Add User</h3>
        </div>
        <AddUserForm/>
      </div>
    </main>
  );
}