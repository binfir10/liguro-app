"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  type: string;
  setColorFilter?: (name: string) => void;
  colorFilter?: string;
  sortOption?: string;
  setSortOption?: (name: string) => void;
  status?: string;
  setStatus?: (name: string) => void;
}

export default function FilterActions({
  type,
  setColorFilter,
  colorFilter,
  sortOption,
  setSortOption,
  status,
  setStatus,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="h-8 w-8 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {type === "category" && setSortOption && setColorFilter && (
            <>
              <DropdownMenuItem className="focus:bg-transparent">
                <Select
                  value={colorFilter || ""}
                  onValueChange={(value) => setColorFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      {hexaName.map((color) => (
                        <SelectItem key={color.id} value={color.hexa}>
                          <div className="flex gap-1 items-center  justify-center">
                            <div
                              className={`w-4 h-4 ${color.hexa}  rounded-full border`}
                              style={{ background: color.hexa }}></div>
                            <span>{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-transparent"
                onClick={(e) => e.preventDefault()}>
                <Select
                  value={sortOption || ""}
                  onValueChange={(value) => setSortOption(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="date">Fecha</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
            </>
          )}

          {type === "task" && setStatus && (
            <DropdownMenuItem
              className="focus:bg-transparent"
              onClick={(e) => e.preventDefault()}>
              <Select
                value={status || ""}
                onValueChange={(value) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estado</SelectLabel>
                    <SelectItem value="error">
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-4 h-4 mr-2 bg-red-500 rounded-full border`}></div>
                        Fallido
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-4 h-4 mr-2 bg-yellow-500 rounded-full border`}></div>{" "}
                        Pendiente
                      </div>
                    </SelectItem>
                    <SelectItem value="success">
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-4 h-4 mr-2 bg-green-500 rounded-full border`}></div>
                        Completado
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const hexaName = [
  {
    id: 1,
    name: "Sin Color",
    hexa: "bg-transparent",
  },

  {
    id: 2,
    name: "Amarillo",
    hexa: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Verde",
    hexa: "bg-green-500",
  },
  {
    id: 4,
    name: "Azul",
    hexa: "bg-blue-500",
  },
  {
    id: 5,
    name: "Purpura",
    hexa: "bg-purple-500",
  },
  {
    id: 6,
    name: "Rosa",
    hexa: "bg-pink-500",
  },
  {
    id: 7,
    name: "Gris",
    hexa: "bg-gray-500",
  },
  {
    id: 8,
    name: "Rojo",
    hexa: "bg-red-500",
  },
  {
    id: 9,
    name: "Naranja",
    hexa: "bg-orange-500",
  },
  {
    id: 10,
    name: "Indigo",
    hexa: "bg-indigo-500",
  },
  {
    id: 11,
    name: "Lima",
    hexa: "bg-lime-500",
  },
  {
    id: 12,
    name: "Cyan",
    hexa: "bg-cyan-500",
  },
];
