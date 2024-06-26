
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
import { Button } from "./ui/button"
import { signOut } from "@/lib/actions/auth-actions"

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
    <Link href={"/"} className="font-black underline underline-offset-4 flex items-center justify-center decoration-purple-500">
    <Image src={"/icon-144x144.png"} alt="" width={1000} height={1000} className="size-10 rounded-full" />
    <span className="font-extrabold text-2xl text-purple-100 hover:text-purple-200">

    LIGURO
    </span>

    </Link>
      <div className='flex items-center gap-2'>

        <ModeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <MenuIcon className='hover:text-background cursor-pointer' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>

            </SheetHeader>

            <SheetFooter>
              <Link href={'/categories'} className='mr-4' onClick={() => setIsOpen(false)}>Categories</Link>
              <form
                action={signOut}
                className="">
                <Button  variant={"link"}>
                  Cerrar Sesion
                </Button>
              </form>
            </SheetFooter>
          </SheetContent>
        </Sheet>


      </div>

      </>
  )
}
