'use server';

import { TodoCreateDTO, TodosType } from '@/types/todosType';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export type PaginatedTodosResponse = {
  data: TodosType[];
  totalCount: number;
  totalPages: number;
};

export async function CreateTodoRequest(
  data: TodoCreateDTO,
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/todos`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return { success: false, message: errorBody.message || 'Unexpected error occurred' };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Internal Server Error',
    };
  }
}

export async function fetchAllTodosRequest(
  limit?: number,
  offset?: number,
  search?: string,
): Promise<PaginatedTodosResponse> {
  try {
    const params = new URLSearchParams();
    if (limit !== undefined) params.append('limit', limit.toString());
    if (offset !== undefined) params.append('offset', offset.toString());
    if (search) params.append('search', search);

    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/todos?${params.toString()}`,
      {
        method: 'GET',
      },
    );

    return response.json();
  } catch {
    return {
      data: [],
      totalCount: 0,
      totalPages: 0,
    };
  }
}

export async function deleteTodoRequest(
  id: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return { success: false, message: errorBody.message || 'Unexpected error occurred' };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Internal Server Error',
    };
  }
}

export async function updateTodoRequest(
  id: string,
  data: TodoCreateDTO,
): Promise<{
  success: boolean;
  updatedTodo?: TodosType;
  message: string;
}> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return {
        success: false,
        message: errorBody.message || 'Unexpected error occurred',
      };
    }

    return {
      success: true,
      message: 'updated successfully',
      updatedTodo: await response.json(),
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Internal Server Error',
    };
  }
}
