import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import Mainnav from './Mainnav'
import Storeswitcher from './Storeswitcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

const Navbar = async () => {
  const { userId } = auth()

  if (!userId){
    redirect('/login')
  }
  const stores = await prismadb.store.findMany({
    where: {
        userId
    },
  })
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-6'>
            <Storeswitcher items={stores} />
            <Mainnav className='mx-6'/>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar