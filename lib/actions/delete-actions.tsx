'use server'

import { createClient } from "@/utils/supabase/server";

export const deleteTask = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting task:", error);
    return { success: false, error };
  }
  return { success: true };
}


export const deleteTasksByCategoryId = async (categoryId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("category_id", categoryId);
  if (error) {
    console.error("Error deleting tasks for category:", error);
    return { success: false, error };
  }
  return { success: true };
}

export const deleteCategory = async (id: string) => {
  const supabase = createClient();

  // Primero eliminamos las tareas asociadas a la categoría
  await deleteTasksByCategoryId(id);

  // Luego eliminamos la categoría
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting category:", error);
    return { success: false, error };
  }
  return { success: true };
}

