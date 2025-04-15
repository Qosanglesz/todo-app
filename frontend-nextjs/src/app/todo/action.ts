'use server'

import {TodosType} from "@/types/todosType";

export async function CreateTodoRequest(data:any): Promise<boolean> {
    const response = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
    return response.ok;



}