'use client'
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import { Add, Logout, Search } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const TopBar = () => {
  const route = useRouter();
  const [search, setSearch] = useState('');
  return (
    <div className='flex justify-between items-center mt-6'>
      <div className='relative'>
        <input 
        type="text" 
        className='search-bar' 
        placeholder='Search posts...'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        <Search className='search-icon' onClick={()=>{}}/>
      </div>

      <button className='create-post-btn' onClick={()=> route.push('/create-post')}>
        <Add/> <p>Create a Post</p>
      </button>

      <div className='flex gap-4 md:hidden'>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer  items-center md:hidden '>
                <Logout sx={{color:'white', fontSize:'32px'}} />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
      <Link href={'/'}>
        {/* <Image alt='profile' width={50} height={50} className='rounded-full md:hidden' /> */}
      </Link>
    </div>
  )
}

export default TopBar