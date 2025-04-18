export interface SignInData {
  username: string;
  password: string;
}

export async function signIn(
  signInData: SignInData,
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(signInData),
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
