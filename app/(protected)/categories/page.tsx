import CategoryCard from "@/components/category-card";
import { CategoryDialog } from "@/components/create-category-dialog";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";

export default async function page() {
  return (
    <div className="mt-5 p-3 items-center">
      <div className="flex items-center justify-between text-center py-4">
        <h1 className="font-bold max-sm:text-3xl text-5xl">Categorias</h1>
        <CategoryDialog
          trigger={
            <Button variant="default">
              <BadgePlus className="w-5 h-5 mr-2" /> Agregar
            </Button>
          }
          type="create"
        />
      </div>
      
      <CategoryCard />
    </div>
  );
}