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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/types/types";
import { ReactNode } from "react";
interface Props {
  trigger?: ReactNode;
  type: CategoryType;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CategoryDialog({ trigger, isOpen, setIsOpen, type }: Props) {
  let types = type === "create" ? "Crea una" : "Edita la";
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{types} Categoria</DialogTitle>
          <DialogDescription>Completa los datos </DialogDescription>

        </DialogHeader>
        <div className="flex  flex-col space-y-4">
          <div className="space-y-1">
            <Label htmlFor="category">Nombre</Label>
            <Input
              type="text"
              id="category"
              placeholder="New Category"
              className="bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label>Color:</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  {colorsName.map((color) => {
                    return (
                      <SelectItem key={color.id} value={color.name}>
                        <div className="flex gap-1 items-center justify-center">
                          <div
                            className={` w-4 h-4 ${color.color} rounded-full`}
                          />
                          <span className="">{color.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" variant="default" className="w-full">
              {type === "create" ? "Agregar" : "Actualizar"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const colorsName = [
  {
    id: 1,
    name: "Ninguno",
    color: "bg-transparent",
  },

  {
    id: 2,
    name: "Amarillo",
    color: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Verde",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Azul",
    color: "bg-blue-500",
  },
  {
    id: 5,
    name: "Purpura",
    color: "bg-purple-500",
  },
  {
    id: 6,
    name: "Rosa",
    color: "bg-pink-500",
  },
  {
    id: 7,
    name: "Gris",
    color: "bg-gray-500",
  },
  {
    id: 8,
    name: "Rojo",
    color: "bg-red-500",
  },
  {
    id: 9,
    name: "Naranja",
    color: "bg-orange-500",
  },
  {
    id: 10,
    name: "Indigo",
    color: "bg-indigo-500",
  },
  {
    id: 11,
    name: "Lima",
    color: "bg-lime-500",
  },
  {
    id: 12,
    name: "Cyan",
    color: "bg-cyan-500",
  },
];
