'use server';

import { cookies } from 'next/headers';

export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  const headers: HeadersInit = {
    ...(init.headers || {}),
    'Content-Type': 'application/json',
  };

  if (token) {
    // @ts-expect-error skip
    headers['Cookie'] = `jwt=${token}`;
  }

  return fetch(input, {
    ...init,
    headers,
  });
};
