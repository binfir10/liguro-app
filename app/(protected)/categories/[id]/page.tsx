import { TaskDialog } from "@/components/create-task-dialog";
import { ActionsMenu } from "@/components/menu-actions";
import ArrowRight from "@/components/ui/arrowleft";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategoryById, getTasks } from "@/lib/actions/get-actions";
import { ITasks } from "@/types/types";
import { BadgePlus, Car } from "lucide-react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const categoryData = await getCategoryById(id);
  const tasks = await getTasks(id);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between text-center py-4">
        <h1 className="font-bold capitalize max-sm:text-3xl text-5xl text-left text-balance">
          {categoryData?.name}
        </h1>
        <div className="flex flex-wrap justify-end gap-2 items-center">
          <TaskDialog
            trigger={
              <Button variant="default">
                <BadgePlus className="w-5 h-5 mr-2" />
                Agregar
              </Button>
            }
            type="create"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {tasks.length !== 0 ? (
          tasks.map((task: ITasks) => {
            return (
              <Card
                key={task.title}
                className="p-2 flex w-full justify-between items-center  group ">
                <div className="flex items-center gap-2 transition-transform justify-between group-hover:translate-x-1">
                  <ArrowRight status={task.status} />
                  <span className="text-base text-balance tracking-tighter font-thin">
                    {task.title}
                  </span>
                </div>
                <ActionsMenu state="task" id={task.id} />
              </Card>
            );
          })
        ) : (
          <span className="flex items-center justify-center my-10 font-semibold">
            No hay tareas
          </span>
        )}
      </div>
    </div>
  );
}
