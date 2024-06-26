"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from 'lucide-react';
import { deleteCategory, deleteTask } from "@/lib/actions/delete-actions";
import { toast } from "./ui/use-toast";

interface DeleteButtonProps {
  id: string;
  type: 'task' | 'category';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, type, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar el diálogo
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const onDelete = type === 'task' ? deleteTask : deleteCategory;
    try {
      const result = await onDelete(id);
      if (result.success) {
        toast({
          title: '✅ Se elimino con exito',
        })
        router.refresh();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast({
        variant: 'destructive',
        title: '❌ Hubo un error, Vuelva a intentar'
      })
    }
   
    setIsLoading(false);
    setIsDialogOpen(false); // Cerrar el diálogo después de la eliminación
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <div onClick={onClick} className=" flex items-center cursor-pointer">
 
            <TrashIcon className="text-red-500 hover:text-red-700  mr-2 h-4 w-4" />
            <span>Borrar</span>
        
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer y eliminará permanentemente {type === 'task' ? 'la tarea' : 'la categoría'}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick} className="bg-destructive text-destructive-foreground hover:bg-destructive/80">
            {isLoading ? "Eliminando..." : "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
