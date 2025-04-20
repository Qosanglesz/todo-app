export interface SignUpData {
    username: string;
    password: string;
}

export async function signUp(
    signInData: SignUpData,
): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(signInData),
        });
        if (!response.ok) {
            const errorBody = await response.json();
            return { success: false, message: errorBody.message || 'Unexpected error occurred' };
        }
        return { success: true, message: 'Success' };
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message || 'Internal Server Error',
        };
    }
}
