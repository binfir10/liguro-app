import { CategoryDialog } from "@/components/create-category-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BadgePlus, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="mt-5 p-3 w-screen">
      <div className="flex items-center justify-between text-center py-4">
        <h1 className="font-bold font-serif text-5xl">Categorias</h1>
        <CategoryDialog
          trigger={
            <Button variant="secondary">
              <BadgePlus className="w-5 h-5 mr-2" /> Agregar
            </Button>
          }
          type="create"
        />
      </div>

      <Input placeholder="Buscar..." className="my-4" />
      <div className="flex flex-col gap-1">
        {categoriesList.map((category) => {
          return (
            <Card
              key={category.title}
              className={`p-2 flex w-full justify-between items-center  group`} >
              <Link href={`/categories/${category.href}`} className="flex items-center">
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
              </Link>
              <div className="flex gap-3">
                <CategoryDialog
                  trigger={
                    <Button variant="link" size={"icon"}>
                      <Pencil className="text-sky-500 h-5 hover:text-sky-700" />{" "}
                    </Button>
                  }
                  type="edit"
                />

                <button>
                  <Trash className="text-red-500 h-5 hover:text-red-700" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
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
