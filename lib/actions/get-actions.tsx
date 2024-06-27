"use server";
import { ICategories, ITasks } from "@/types/types";
import { createClient } from "@/utils/supabase/server";

export const getCategories = async (): Promise<ICategories[]> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const userId = user?.id;

  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryById = async (
  id: string
): Promise<ICategories | null> => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching category:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const getTasks = async (id: string): Promise<ITasks[]> => {
  const supabase = createClient();
  try {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .in("category_id", [id])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getTaskById = async (id: string): Promise<ITasks | null> => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching task:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
};
