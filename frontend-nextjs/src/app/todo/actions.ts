'use server'


import {TodoCreateDTO} from "@/types/todosType";

export async function CreateTodoRequest(data: TodoCreateDTO): Promise<{ success: boolean, message?: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/todos`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
        })

        if (!response.ok) {
            const errorBody = await response.json();
            return {success: false, message: errorBody.message || 'Unexpected error occurred'}
        }

        return {success: true}
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || 'Internal Server Error',
        }
    }
}