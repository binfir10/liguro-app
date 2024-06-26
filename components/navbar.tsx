import NavbarMenu from "./navbar-menu";

export default async function Navbar() {
  return (
    <header className='w-full h-16 bg-accent px-4 flex justify-between py-3  items-center '>
      <NavbarMenu />
    </header>
  )
}
