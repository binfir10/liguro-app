import { TaskDialog } from "@/components/create-task-dialog";
import { ActionsMenu } from "@/components/menu-actions";
import ArrowRight from "@/components/ui/arrowleft";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BadgePlus } from "lucide-react";

export default function page({ params }: { params: string }) {
  return (
    <section className="p-3 w-screen">
      <div className="flex items-center justify-between text-center py-4">
        <h1 className="font-bold max-sm:text-3xl text-5xl text-left text-balance">
          Diseño Web
        </h1>
        <div className="flex flex-wrap justify-end gap-2 items-center">
          <TaskDialog
            trigger={
              <Button variant="secondary">
                <BadgePlus className="w-5 h-5 mr-2" />
                Agregar
              </Button>
            }
            type="create"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {categoriesList.map((task) => {
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
              <ActionsMenu state="task" />
            </Card>
          );
        })}
      </div>
    </section>
  );
}

const categoriesList = [
  {
    title: "Diseño Web",
    status: "error",
  },
  {
    title: "Desarrollo Web",
    status: "pending",
  },
  {
    title: "Marketing Digital",
    status: "success",
  },
  {
    title: "Cambiar el color del hero y agregar texto",
    status: "success",
  },
];
