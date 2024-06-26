"use server";
import { CategoryType, TaskType } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export const handleSubmitCategory = async (
  type: CategoryType,
  id: string | undefined,
  name: string,
  color: string
) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  try {
    if (type === "create") {
      const newCategory = { name, color, user_id };
      const { data, error } = await supabase
        .from("categories")
        .insert(newCategory)
        .select();

      if (error) {
        console.error(error);
        return { success: false, error };
      }

      if (data) {
        console.log(data);
        return { success: true, data };
      }
    } else if (type === "edit" && id) {
      const updatedCategory = { name, color };
      const { data, error } = await supabase
        .from("categories")
        .update(updatedCategory)
        .eq("id", id)
        .select();

      if (error) {
        console.error(error);
        return { success: false, error };
      }

      if (data) {
        console.log(data);
        return { success: true, data };
      }
    }
  } catch (error) {
    console.error("Error handling category:", error);
    return { success: false, error };
  }
};

export const handleSubmitTask = async (
  type: TaskType,
  id: string | undefined,
  category_id: string,
  title: string,
  status: string,
  description: string
) => {
  const supabase = createClient();

  try {
    if (type === "create") {
      const newTask = { title, status, description, category_id };
      const { data, error } = await supabase
        .from("tasks")
        .insert(newTask)
        .select();

      if (error) {
        console.error(error);
        return { success: false, error };
      }

      if (data) {
        console.log(data);
        return { success: true, data };
      }
    } else if (type === "edit" && id) {
      const updatedTask = { title, status, description };
      const { data, error } = await supabase
        .from("tasks")
        .update(updatedTask)
        .eq("id", id)
        .select();

      if (error) {
        console.error(error);
        return { success: false, error };
      }

      if (data) {
        console.log(data);
        return { success: true, data };
      }
    }
  } catch (error) {
    console.error("Error handling task:", error);
    return { success: false, error };
  }
};
