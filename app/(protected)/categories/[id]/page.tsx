import { TaskDialog } from "@/components/create-task-dialog";
import { ActionsMenu } from "@/components/menu-actions";
import ArrowRight from "@/components/ui/arrowleft";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategoryById, getTasks } from "@/lib/actions/get-actions";
import { ITasks } from "@/types/types";
import { BadgePlus, Car } from "lucide-react";
import { Suspense } from "react";
import CategoryCardSkeleton from "./loading";
import TaskCard from "@/components/task-card";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const categoryData = await getCategoryById(id);
  const tasks: ITasks[] = await getTasks(id);

  return (
    <div className="p-3">
      <TaskCard tasks={tasks} categoryData={categoryData} />
    </div>
  );
}
