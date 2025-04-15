"use client"

import TodoTable from "@/components/todo-page/TodoTable";
import TodoSearchBar from "@/components/todo-page/TodoSearchBar";
import CreateTodoDialog from "@/components/todo-page/CreateTodoDialog";

export default function TodoPage() {
    return (
        <div className="h-screen">
            <p className="text-2xl font-bold">{'Todo List Management'}</p>

            <div className="flex justify-between items-center">
                <TodoSearchBar/>
                <CreateTodoDialog/>
            </div>

            <div>
                <TodoTable/>
            </div>
        </div>
    )
}