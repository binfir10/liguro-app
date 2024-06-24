'use client'
import { ActionsMenu } from "@/components/menu-actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CategoryCard() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categoriesList.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
<div className="relative">
        <Search className="absolute left-2 top-2 text-foreground/40" />
        <Input placeholder="Buscar..." className="my-4 pl-9" onChange={(e) => setSearchQuery(e.target.value)} />

      </div>

      <div className="flex flex-col gap-1">
        {filteredCategories.map((category) => {
          return (
            <Card key={category.title} className={`p-2 flex w-full justify-between items-center  group`} >
              <Link href={`/categories/${category.href}`} className="flex items-center">
              <div className="flex justify-between items-center">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 rounded-full" style={
                    {
                      backgroundColor: category.color
                      
                    }
                  }
                  >
                  <polyline points="9 6 15 12 9 18" />
                </svg>{" "}
                <h2>{category.title}</h2>
                  </div>
              </Link>
              <ActionsMenu state="category" />
            </Card>
          );
        })}
      </div>
  </>
  )
}
const categoriesList = [
  {
    title: "Diseño Web",
    href: "/desing",
    color: "rgb(34 197 94 / 1)"
    
  },
  {
    title: "Desarrollo Web",
    href: "/development",
    color: "rgb(185 28 28/1)"
  },
  {
    title: "Marketing Digital",
    href: "/marketing",
    color: "rgb(3 105 161/1)"
  },
];
