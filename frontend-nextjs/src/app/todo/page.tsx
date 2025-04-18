"use client"

import TodoTable from "@/components/todo-page/TodoTable";
import TodoSearchBar from "@/components/todo-page/TodoSearchBar";
import CreateTodoDialog from "@/components/todo-page/CreateTodoDialog";
import {useEffect, useState} from "react";
import {deleteTodoRequest, fetchAllTodosRequest, updateTodoRequest} from "@/app/todo/actions";
import {toast} from "sonner";
import {TodosType, TodoUpdateDTO} from "@/types/todosType";
import {Toast} from "next/dist/client/components/react-dev-overlay/ui/components/toast";

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

    const onEdit = async (todoId: string, newData: TodoUpdateDTO) => {
        setIsLoading(true)
        try {
            const result = await updateTodoRequest(todoId, newData);
            if (result.success && result.updatedTodo) {
                const updatedTodo = result.updatedTodo
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
                    )
                )
                toast.success("Success to update a todo")
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    const onDeleted = async (id:string) => {
        setIsLoading(true)
        try {
            const result = await deleteTodoRequest(id);
            if (result.success) {
                toast.success("Deleted todo successfully!")
                await reloadTodos()
            } else {
                toast.error(result.message)
            }

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
                <TodoTable todos={todos} onDelete={onDeleted} onEdit={onEdit}/>
            </div>
        </div>
    )
}