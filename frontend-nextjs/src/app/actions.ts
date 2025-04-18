'use server';
import { cookies } from 'next/headers';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export const isAuth = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) return { success: false, message: 'Unauthorized' };

    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    const result: { username: string } = await response.json();
    if (!result.username) {
      return { success: false, message: 'Unauthorized' };
    }
    return { success: true, message: 'Success' };
  } catch {
    return {
      success: false,
      message: 'Internal server error',
    };
  }
};
