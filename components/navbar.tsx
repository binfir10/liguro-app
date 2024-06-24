'use client'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from './ui/theme-toggle'

export default function Navbar() {
  
  const theme = useTheme()

  return (
    <header className='w-full bg-accent px-4 flex justify-between py-3  items-center '>
      <Link href={"/"}>
        {theme.resolvedTheme === "light" ? (<Image src="/logo-light.png" alt='' height={60} width={100} className='cursor-pointer aspect-auto' />)
          :
          (<Image src="/logo-dark.png" alt='' height={60} width={100} className='cursor-pointer aspect-auto' />)

        }

      </Link>
      <div className='flex items-center gap-2'>

      <ModeToggle />
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon className='hover:text-primary cursor-pointer' />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>

          </SheetHeader>

          <SheetFooter className='items-end gap-3'>
            <Link href={'/categories'} className='mr-4'>Categories</Link>
            <Link href={'/auth'} className='mr-4'>Auth</Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>


      </div>

    </header>
  )
}
