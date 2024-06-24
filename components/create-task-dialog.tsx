
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskType } from "@/types/types";
import { ReactNode } from "react";
interface Props {
  trigger?: ReactNode;
  type: TaskType;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TaskDialog({ trigger, setIsOpen, isOpen, type }: Props) {
  let types = type === "create" ? "Crea una" : "Edita la";
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{types} Tarea</DialogTitle>
          <DialogDescription>Completa los datos </DialogDescription>
        </DialogHeader>
        <div className="flex  flex-col space-y-4">
          <div className="space-y-1">
            <Label htmlFor="category">Nombre</Label>
            <Input type="text" id="category" placeholder="New Task" />
          </div>
          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="error">Fallido</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="success">Completado </SelectItem>


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="default" className="w-full">
              {
                type === "create" ? "Agregar" : "Actualizar"
              }

            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
