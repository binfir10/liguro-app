'use client'
import React, { Suspense, useState } from 'react'
import { Card } from './ui/card'
import ArrowRight from './ui/arrowleft'
import { ActionsMenu } from './menu-actions'
import { ICategories, ITasks } from '@/types/types'
import CategoryCardSkeleton from './skeletonCard'
import { TaskDialog } from './create-task-dialog'
import { Button } from './ui/button'
import { BadgePlus } from 'lucide-react'
import FilterActions from './filter-actions'
import { Badge } from './ui/badge'
import { getStatusName } from '@/lib/utils'
import PaginationComponent from './pagination-card'

interface Props {
  tasks: ITasks[]
  categoryData: ICategories | null;
}


export default function TaskCard({tasks,categoryData}:Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [status, setStatus] = useState("");
  const statusName = getStatusName(status)
  const clearFilter = () => {
    setStatus("");
  };

  console.log(status);
  const filteredTasks = tasks.filter(task => {
    if (status === "") {
      return true; // Mostrar todas si no hay filtro de estado
    } else {
      return task.status === status;
    }
  });
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
         <div className="flex items-center justify-between text-center max-[350px]:flex-col max-[350px]:gap-5 py-4">
        <h1>
          {categoryData?.name}
        </h1>
        <div className="flex flex-wrap justify-end gap-2 items-center max-[350px]:justify-between w-full">
          <TaskDialog
            trigger={
              <Button variant="default">
                <BadgePlus className="w-5 h-5 mr-2" />
                Agregar
              </Button>
            }
            type="create"
          />
          <FilterActions type='task' setStatus={setStatus} status={status}  />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        {status && (
          <Badge variant="outline">
            Estado: {statusName}
            <button onClick={clearFilter} className="ml-2">x</button>
          </Badge>
        )}

      </div>
    <Suspense fallback={<CategoryCardSkeleton />}>

      <div className="flex flex-col gap-1">
          {currentTasks.length !== 0 ? (
            currentTasks.map((task: ITasks) => {
            return (
              <Card
                key={task.title}
                className={`p-2 flex w-full justify-between items-center bor   group  `}>
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
    </Suspense>
      {filteredTasks.length > 10 && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageClick={handlePageClick}
        />
      )}
                </>
  )
}
