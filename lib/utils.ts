import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { hexaName } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getColorNameByHexa = (hexa: string) => {
  const color = hexaName.find(color => color.hexa === hexa);
  return color ? color.name : ""; // Retorna el nombre del color si se encuentra, o una cadena vacía si no se encuentra
};

export const getStatusName = (status: string) =>{
  if (status === "error"){
    return "Fallido"
  } else if (status === "pending") {
    return "Pendiente"
  } else return "Completado"
}

