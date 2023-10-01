"use client";

import Image from "next/image";
import AddUserForm from "../components/addUserForm";
import Link from "next/link";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { useRouter } from "next/router";

export default function AddEmployee() {

//   const router = useRouter()

//   const handleBackClick = () => {
//       router.push("/manageEmployees")
//   }
      
  return (
    <main className="flex h-screen justify-center bg-gray-100">
      {/* <button className="absolute left-60 top-20 m-4" onClick={handleBackClick}>
        <ArrowBackIosNewIcon/>
      </button> */}
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Add User</h3>
        </div>
        <AddUserForm/>
      </div>
    </main>
  );
}