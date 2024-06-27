
'use client'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { signOut } from "@/lib/actions/auth-actions"
import { MenuIcon } from 'lucide-react'
import { Link } from "next-view-transitions"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"
import { ModeToggle } from './ui/theme-toggle'

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
    <Link href={"/categories"} className="font-black underline underline-offset-4 flex items-center justify-center decoration-violet-500">
    <Image src={"/icon-192x192.png"} alt="" width={1000} height={1000} className="size-10 rounded-full" />
    <span className="font-extrabold text-2xl text-violet-100 transition duration-150 hover:text-violet-200">

    LIGURO
    </span>

    </Link>
      <div className='flex items-center gap-2'>

        <ModeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <MenuIcon className='hover:text-violet-300 cursor-pointer' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>

            </SheetHeader>

            <SheetFooter>
              <Link href={'/categories'}  onClick={() => setIsOpen(false)}>Categories</Link>
              <Link href={'/account'}  onClick={() => setIsOpen(false)}>Cuenta</Link>
              <form
                action={signOut}
                className="">
                <button className="text-primary">
                  Cerrar Sesion
                </button>
              </form>
            </SheetFooter>
          </SheetContent>
        </Sheet>


      </div>

      </>
  )
}
