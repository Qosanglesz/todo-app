"use client"

import TodoTable from "@/components/todo-page/TodoTable";
import TodoSearchBar from "@/components/todo-page/TodoSearchBar";
import CreateTodoDialog from "@/components/todo-page/CreateTodoDialog";
import {useEffect, useState} from "react";
import {fetchAllTodosRequest} from "@/app/todo/actions";
import {toast} from "sonner";
import {TodosType} from "@/types/todosType";

export default function TodoPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useState<TodosType[]>([]);

    useEffect(() => {
        const loadingTodos = async () => {
            try {
                const todoData = await fetchAllTodosRequest();
                setTodos(todoData)
            } catch (error) {
                toast.error((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        }
        loadingTodos()
    }, [])

    const reloadTodos = async () => {
        setIsLoading(true)
        try {
            const todoData = await fetchAllTodosRequest()
            setTodos(todoData)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <div className="h-screen">
            <p className="text-2xl font-bold">{'Todo List Management'}</p>

            <div className="flex justify-between items-center">
                <TodoSearchBar/>
                <CreateTodoDialog onCreated={reloadTodos} />
            </div>

            <div>
                <TodoTable todos={todos}/>
            </div>
        </div>
    )
}