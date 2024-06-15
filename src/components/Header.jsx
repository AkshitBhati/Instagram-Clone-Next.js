import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        <Link href={"/"}>
        <Image 
        src="/logo1.webp"
        width={50}
        height={50}
        alt='Logo'
        className='lg:hidden'
        />
       
       <Image 
        src="/logo 2.webp"
        alt='Logo'
        width={96}
        height={96}
        className='hidden lg:inline-flex'
        />
       </Link>

        {/* Serach box */}
        <input 
        type="text" 
        className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[200px]' 
        placeholder='Search'
        />


        {/* signin */}

        <button className='text-sm font-semibold text-blue-500'>Log in</button>
      </div>
    </div>
  )
}
