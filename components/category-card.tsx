'use client'
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/actions/get-actions";
import { ICategories } from "@/types/types";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ActionsMenu } from "./menu-actions";

interface CategoryCardProps {
  categories: ICategories[];
}

export default function CategoryCard() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2 top-2 text-foreground/40" />
        <Input
          placeholder="Buscar..."
          className="my-4 pl-9"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center my-10 font-semibold">
          Cargando categorías...
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(({ id, name, color }) => (
              <Card
                key={id}
                className={`p-2 flex w-full justify-between items-center  group`}
              >
                <Link href={`/categories/${id}`} className="flex items-center">
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
                      className={`mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 rounded-full ${color}`}
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </svg>{" "}
                    <h2 className="capitalize">{name}</h2>
                  </div>
                </Link>
                <ActionsMenu state="category" id={id} />
              </Card>
            ))
          ) : (
            <span className="flex items-center justify-center my-10 font-semibold">
              No hay resultados
            </span>
          )}
        </div>
      )}
    </>
  );
}
