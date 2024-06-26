
'use client'
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { ModeToggle } from './ui/theme-toggle'
import { useEffect, useState } from "react"

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme()

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner, or a fallback component
  }

  return (
    <>
    <Link href={"/"}>
      {theme.resolvedTheme === "light" ? (<Image src="/logo-light.png" alt='' height={60} width={100} className='cursor-pointer aspect-auto' />)
        :
        (<Image src="/logo-dark.png" alt='' height={60} width={100} className='cursor-pointer aspect-auto' />)
        
      }

    </Link>
      <div className='flex items-center gap-2'>

        <ModeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <MenuIcon className='hover:text-primary cursor-pointer' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>

            </SheetHeader>

            <SheetFooter>
              <Link href={'/categories'} className='mr-4' onClick={() => setIsOpen(false)}>Categories</Link>
              <Link href={'/auth'} className='mr-4' onClick={() => setIsOpen(false)}>Auth</Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>


      </div>

      </>
  )
}
