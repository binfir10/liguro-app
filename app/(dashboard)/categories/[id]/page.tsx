
import { TaskDialog } from '@/components/create-task-dialog'
import ArrowRight from '@/components/ui/arrowleft'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BadgePlus, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page({params} : {params:string}) {
  
  return (
    <section className='p-3 w-screen'>

      <div className='flex items-center justify-between text-center py-4'>
        <h1 className='font-bold font-mono text-5xl text-left text-balance'>

          Diseño Web
        </h1>
        <div className='flex flex-wrap justify-end gap-2 items-center'>
          <TaskDialog
            trigger={
              <Button variant="secondary">
                <BadgePlus className="w-5 h-5 mr-2" />Agregar
              </Button>
            }
            type="create"
          />
        </div>

      </div>
  
      <div className='flex flex-col gap-1'>
        {
          categoriesList.map((task) => {
            return (
              <Card
                key={task.title}
                className="p-2 flex w-full justify-between items-center  group ">
                <div className="flex items-center gap-2 transition-transform group-hover:translate-x-1">
    <ArrowRight status={task.status } />
                  <h2>{task.title}</h2>
                  <span className={`text-xs ${task.status === "error" ? "text-red-500" : task.status === "success" ? "text-green-500" : "text-yellow-500"}`}>{task.status === "error" ? "Error" : task.status === "success" ? "Completado" : "Pendiente"}</span>
                    </div>
            
                <div className="flex gap-3">
                  <TaskDialog
                    trigger={
                      <Button variant="link" size={"icon"}>
                        <Pencil className="text-sky-500 h-5 hover:text-sky-700" />{" "}
                      </Button>
                    }
                    type="edit"
                  />

                  <button>
                    <Trash className="text-red-500 h-5 hover:text-red-700" />
                  </button>
                </div>
              </Card>
            )
          })
        }
      </div>
    </section>
  )
}

const categoriesList = [
  {
    title: "Diseño Web",
    status: "error"
  },
  {
    title: "Desarrollo Web",
    status: "pending"
  },
  {
    title: "Marketing Digital",
    status: "success"
  },


]