"use client";
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
import "moment/locale/es";
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
import { getTaskById } from "@/lib/actions/get-actions";
import { handleSubmitTask } from "@/lib/actions/submit-actions";
import { ITasks, TaskType } from "@/types/types";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "./ui/use-toast";
interface Props {
  trigger?: ReactNode;
  type: TaskType;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

export function TaskDialog({ trigger, setIsOpen, isOpen, type, id }: Props) {
  const router = useRouter();
  const [task, setTask] = useState<ITasks | null>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const category_id = params.id as string;

  useEffect(() => {
    if (isOpen && id && type === "edit") {
      const fetchTask = async () => {
        const taskData = await getTaskById(id);
        if (taskData) {
          setTask(taskData);
          setTitle(taskData.title);
          setStatus(taskData.status);
          setCreateAt(taskData.created_at);
        }
      };
      fetchTask();
    }
  }, [isOpen, id, type]);
  const date = new Date(createAt);
  moment.locale("es");
  const newDate = moment(date).fromNow();

  let types = type === "create" ? "Crea una" : "Edita la";

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const result = await handleSubmitTask(
      type,
      id,
      category_id,
      title,
      status,
      description
    );
    if (result?.success) {
      
      const toastes =
        type === "create"
          ? "✅ Se creo la tarea con exito"
          : "✅ Se edito la ta tarea con exito";
      toast({
        title: toastes,
      });
router.refresh();
      
    } else {
      // Manejar errores aquí
      toast({
        variant: "destructive",
        title: "❌ Hubo un error, Vuelva a intentar",
      });
      console.error("Error en la operación:", result?.error);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{types} Tarea</DialogTitle>
          <DialogDescription>
            {" "}
            {createAt ? `Creado hace ${newDate}` : "Completa los datos"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="flex  flex-col space-y-4">
            <div className="space-y-1">
              <Label htmlFor="task">Nombre</Label>
              <Input
                type="text"
                id="task"
                placeholder="New Task"
                value={title || ""}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>Status:</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
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
