import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ui/theme-toggle'

export default function Navbar() {
  return (
    <header className='w-full bg-primary px-4 flex justify-between py-3 flex-auto '>
      <Link href={"/"}>
      <Image src="/logo-dark.png" alt='' height={60} width={100} className='cursor-pointer' />
      </Link>
      <nav className='flex items-center justify-center font-bold'>
        <ModeToggle />
      </nav>
      
    </header>
  )
}
