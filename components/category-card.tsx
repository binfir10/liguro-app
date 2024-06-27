'use client'
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getColorNameByHexa } from "@/lib/utils";
import { ICategories } from "@/types/types";
import { Link } from "next-view-transitions";
import { Suspense, useState } from "react";

import { ActionsMenu } from "./menu-actions";
import PaginationComponent from "./pagination-card";
import CategoryCardSkeleton from "./skeletonCard";
import { Badge } from "./ui/badge";
import FilterActions from "./filter-actions";

interface Props {
  categories: ICategories[];
}

export default function CategoryCard({ categories }: Props) {

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const itemsPerPage = 10;



  const colorName = getColorNameByHexa(colorFilter);

  const clearFilter = () => {
    setColorFilter("");
  };

  const clearSort = () => {
    setSortOption("");
  };

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((category) => (colorFilter ? category.color === colorFilter : true))
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex items-center gap-3">
  
        <Input
          placeholder="Buscar..."
          className="my-4 "
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterActions setColorFilter={setColorFilter} colorFilter={colorFilter} setSortOption={setSortOption} sortOption={sortOption} type="category"/>
      </div>
      <div className="flex gap-2 mb-3">
        {colorName && (
          <Badge variant="outline">
            Color: {colorName}
            <button onClick={clearFilter} className="ml-2">x</button>
          </Badge>
        )}
        {sortOption && (
          <Badge variant="secondary">
            Ordenar: {sortOption === "name" ? "Nombre" : "Fecha"}
            <button onClick={clearSort} className="ml-2">x</button>
          </Badge>
        )}
      </div>


      <Suspense fallback={<CategoryCardSkeleton />}>
        <div className="flex flex-col gap-1">
          {currentCategories.length > 0 ? (
            currentCategories.map(({ id, name, color }) => (
              <Card
                key={id}
                className={`p-2 flex w-full justify-between items-center group`}
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
                      className={`mr-2 rounded-md w-4 transition-transform group-hover:translate-x-1 ${color}`}
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
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
      </Suspense>

      {filteredCategories.length > 10 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
        />
      )}
    </>
  );
}
