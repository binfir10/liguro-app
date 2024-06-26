export type CategoryType = "create" | "edit"


export type TaskType = "create" | "edit"


export type StatusType = "error" | "pending" | "success"


export interface ICategories {
  id: string,
  user_id: string
  name: string,
  color: string,
  created_at: string;

}

export interface ITasks {
  id: string,
  category_id: string
  status: string,
  title: string,
  description: string,
  created_at: string;

}