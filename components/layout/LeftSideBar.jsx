import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs'
import { Logout } from '@mui/icons-material'

const LeftSideBar = () => {
  return (
    <div className='h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden  custom-scrollbar'>
      <Link href={'/'}>
        {/* <Image  width={200 } height={200} alt='logo'/> */}
      </Link>
     
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 items-center text-[#FFFFFF]'>
          <Link href={'/'}>
            {/* <Image width={50} height={50} alt='profile' className='rounded-full'/> */}
          </Link>
          <p className='text-[14px] font-semibold'>Erdi latifi</p>
        </div>
        <div className='flex text-[#ffffff] justify-between gap-3'>
          <div className='flex flex-col items-center'>
            <p className='text-[16px] font-semibold'>1</p>
            <p className='text-[10px] font-medium'>Posts</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-[16px] font-semibold'>1</p>
            <p className='text-[10px] font-medium'>Followers</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-[16px] font-semibold'>1</p>
            <p className='text-[10px] font-medium'>Following</p>
          </div>
        </div>

        <hr/>

        <Menu/>

        <hr />
        <div className='flex gap-4 items-center'>
          <UserButton/>
          <p className='text-[#ffffff] text-[18px] font-bold'>Manage Accout</p>
        </div>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer gap-4 items-center'>
            <Logout sx={{color:'white', fontSize:'32px'}} />
            <p className='text-[#ffffff] text-[18px] font-bold'>Log Out</p>
            </div>
           
          </SignOutButton>
        </SignedIn>
      </div>
    
    </div>
  )
}

export default LeftSideBar