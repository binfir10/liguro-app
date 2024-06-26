"use client";

import { Button } from './ui/button';
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

interface DeleteButtonProps {
  id: string;
  type: 'task' | 'category';
  onDelete: (id: string) => Promise<{ success: boolean, error?: any }>;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, type, onDelete}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const result = await onDelete(id);
    if (result.success) {
      router.refresh();
    }
    setIsLoading(false);
 ; // Cerrar el diálogo de eliminación después de la acción
  };

 
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="flex items-center justify-center">
          <TrashIcon className="text-red-500 hover:text-red-700 mr-2 h-4 w-4" />
          <span>Borrar</span>
        </Button>
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
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
