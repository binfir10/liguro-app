import { BadgePlus, Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { CategoryType } from "@/types/types";
interface Props {
  trigger: ReactNode;
  type: CategoryType;
}

export function CategoryDialog({ trigger, type }: Props) {
  let types = type === "create" ? "Crea una" : "Edita la";
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{types} Categoria</DialogTitle>
        </DialogHeader>
        <div className="flex  flex-col space-y-4">
          <div className="space-y-1">
            <Label htmlFor="category">Nombre</Label>
            <Input type="text" id="category" placeholder="New Category" />
          </div>
          <div className="flex items-center gap-2">
            <Label>Elegi un Color:</Label>
            <Input
              id="category"
              placeholder="New Category"
              type="color"
              className="w-20 p-0 border-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="error"><div className="flex items-center justify-center gap-2"> <div className="w-4 h-4 bg-red-500 rounded-full" />
                    Fallido

                  </div>
                  </SelectItem>
                  <SelectItem value="pending"><div className="flex items-center justify-center gap-2"> <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                    Pendiente

                  </div>
                  </SelectItem>
                  <SelectItem value="success"><div className="flex items-center justify-center gap-2"> <div className="w-4 h-4 bg-green-500 rounded-full" />
                    Completado

                  </div>
                  </SelectItem>


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="default" className="w-full" >
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
