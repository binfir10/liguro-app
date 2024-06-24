"use client";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskDialog } from "./create-task-dialog";
import { useState } from "react";
import { CategoryDialog } from "./create-category-dialog";

export function ActionsMenu({ state }: { state: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVerticalIcon className="h-5 min-h-5 w-5 min-w-5 hover:text-primary cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:bg-card flex items-center cursor-pointer "
              onClick={() => {
                setIsOpen(true);
              }}>
              <PencilIcon className="text-foreground mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="hover:bg-card">
              <div className="flex items-center">
                <TrashIcon className="text-red-500 hover:text-red-700  mr-2 h-4 w-4" />
                <span>Borrar</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>


        {state === "category" ? (
          <CategoryDialog setIsOpen={setIsOpen} isOpen={isOpen} type="edit" />
        ) : (
          <TaskDialog setIsOpen={setIsOpen} isOpen={isOpen} type="edit" />
        )}

     
    </>
  );
}
