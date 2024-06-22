import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { CategoryType } from "@/types/types";
import { ReactNode } from "react";
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
            <Input type="text" id="category" placeholder="New Category" className="bg-transparent" />
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
                  {
                    colorsName.map((color) => {
                      return (
                        <SelectItem key={color.id} value={color.name}>
                          <div className="flex gap-1 items-center justify-center">
                          <div className={` w-4 h-4 ${color.color} rounded-full`}/>
                            <span className="">{color.name}</span>

                          </div>
                        
                      
                      
                        </SelectItem>
                      )
                    })
                  }
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


const colorsName = [
  {
    id: 1,
    name: "Ninguno",
    color: "bg-transparent"
  },

  {
    id: 2,
    name: "Amarillo",
    color: "bg-yellow-500"
  },
  {
    id: 3,
    name: "Verde",
    color: "bg-green-500"
  },
  {
    id: 4,
    name: "Azul",
    color: "bg-blue-500"
  },
  {
    id: 5,
    name: "Purpura",
    color: "bg-purple-500"
  },{
    id: 6,
    name: "Rosa",
    color: "bg-pink-500"
  },
  {
    id: 7,
    name: "Gris",
    color: "bg-gray-500"
  },
  {
    id: 8,
    name: "Rojo",
    color: "bg-red-500"
  },
  {
    id: 9,
    name: "Naranja",
    color: "bg-orange-500"
  },
  {
    id: 10,
    name: "Indigo",
    color: "bg-indigo-500"
  },
  {
    id: 11,
    name: "Lima",
    color: "bg-lime-500"
  },
  {
    id: 12,
    name: "Cyan",
    color: "bg-cyan-500"
  }
  
]