"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,DialogTrigger} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select,SelectContent,SelectGroup, SelectItem, SelectLabel,SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getCategoryById } from "@/lib/actions/get-actions";
import { handleSubmitCategory } from "@/lib/actions/submit-actions";
import { hexaName } from "@/lib/constants";
import 'moment/locale/es';
import { CategoryType, ICategories } from "@/types/types";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

interface Props {
  trigger?: ReactNode;
  type: CategoryType;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

export function CategoryDialog({
  trigger,
  isOpen,
  setIsOpen,
  type,
  id,
}: Props) {
  const router = useRouter()
  const [category, setCategory] = useState<ICategories | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [createAt, setCreateAt] = useState("");

  useEffect(() => {
    if (isOpen && id && type === "edit") {
      const fetchCategory = async () => {
        const categoryData = await getCategoryById(id);
        if (categoryData) {
          setCategory(categoryData);
          setName(categoryData.name);
          setColor(categoryData.color);
          setCreateAt(categoryData.created_at);
        }
      };
      fetchCategory();
    }
  }, [isOpen,id, type]);

  useEffect(() => {
    if (color) {
      const defaultColorObj = findColorByName(color);
      if (defaultColorObj) {
        setColor(defaultColorObj.hexa);
      }
    }
  }, [color]);

  let types = type === "create" ? "Crea una" : "Edita la";

  const findColorByName = (colorValue: any) => {
    return hexaName.find((color) => color.hexa === colorValue);
  };

  const date = new Date(createAt);
  moment.locale('es');
  const newDate = moment(date).fromNow();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await handleSubmitCategory(type, id, name, color);
    if (result?.success) {
      const toastes = type === "create" ? "✅ Se creo la categoria con exito " : "✅ Se edito la ta categoria con exito"
      toast({
        title: toastes
      })
      router.refresh()
      console.log('Operación exitosa:', result.data);
    } else {
      // Manejar errores aquí
      toast({
        variant: "destructive",
        title: '❌ Hubo un error, Vuelva a intentar'
      })
      console.error('Error en la operación:', result?.error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{types} Categoria</DialogTitle>
          <DialogDescription>
            {createAt ? `Creado hace ${newDate}` : "Completa los datos"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="flex  flex-col space-y-4">
            <div className="space-y-1">
              <Label htmlFor="category">Nombre</Label>
              <Input
                type="text"
                id="category"
                placeholder="New Category"
                value={name || ""}
                onChange={(event) => setName(event.target.value)}
                className="bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>Color:</Label>
              <Select value={color} onValueChange={(value) => setColor(value)}>
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
                            className={`w-4 h-4 ${color.hexa} rounded-full border`}
                          ></div>
                          <span className={`${color}`}>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-start mt-5">
            <DialogClose asChild>
              <Button type="submit" variant="default" className="w-full">
                {type === "create" ? "Agregar" : "Actualizar"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
