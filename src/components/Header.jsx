"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal  from "react-modal"
import { IoMdAddCircleOutline } from "react-icons/io"
import { FaCamera } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setisOpen] = useState(false)

  
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href={"/"}>
          <Image
            src="/logo1.webp"
            width={50}
            height={50}
            alt="Logo"
            className="lg:hidden"
          />

          <Image
            src="/logo 2.webp"
            alt="Logo"
            width={96}
            height={96}
            className="hidden lg:inline-flex"
          />
        </Link>

        {/* Serach box */}
        <input
          type="text"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[200px]"
          placeholder="Search"
        />

        {/* signin */}
        {session ? (
          <div className="flex gap-2 items-center">
          <IoMdAddCircleOutline 
          className="text-2xl cursor-pointer transform duration-300 hover:text-red-600"
          onClick={() => setisOpen(true)}
          />
            <img src={session.user.image} alt={session.user.name} className="h-10 w-10 rounded-full cursor-pointer" onClick={() => signOut()}/>
          </div>
        ) : (
          <button
            className="text-sm font-semibold text-blue-500"
            onClick={() => signIn()}
          >
            Log in
          </button>
        )}
      </div>
      {isOpen && (
        <Modal 
        isOpen={isOpen} 
        className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
        onRequestClose={() => setisOpen(false)}
        ariaHideApp={false}
        >
            <div className="flex justify-center items-center flex-col gap-5 relative">
                <button 
                className="absolute top-[-10%] right-[-2%] border p-1 font-semibold rounded border-black cursor-pointer bg-gray-50 hover:bg-gray-200"
                onClick={() => setisOpen(false)}
                >
                <AiOutlineClose />
                </button>
                <FaCamera size={40}/>
                <input 
                type="text"  
                placeholder="Please enter your caption"
                className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[350px]"
                />

                <button 
                className="bg-gray-800 text-white w-full max-w-[350px] rounded py-1 hover:bg-gray-700 shadow-lg"
                >
                Upload Post
                </button>

            </div>
        </Modal>
      ) }
    </div>
  );
}
