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
import { DeleteButton } from "./delete-button";

export function ActionsMenu({ state, id }: { state: string; id: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDeleteOpen(true);
  };

  console.log("edit Open: ", isEditOpen);

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
                setIsEditOpen(true);
              }}
            >
              <PencilIcon className="text-foreground mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-card" asChild>
              <div>
                <DeleteButton
                  id={id}
                  type={state === "category" ? "category" : "task"}
                  onClick={handleDeleteClick}
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
    
        </DropdownMenuContent>
      </DropdownMenu>

      {state === "category" ? (
        <CategoryDialog
          setIsOpen={setIsEditOpen}
          isOpen={isEditOpen}
          type="edit"
          id={id}
        />
      ) : (
        <TaskDialog
          setIsOpen={setIsEditOpen}
          isOpen={isEditOpen}
          type="edit"
          id={id}
        />
      )}
    </>
  );
}
