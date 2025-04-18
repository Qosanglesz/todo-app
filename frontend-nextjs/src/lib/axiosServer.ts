'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export const getServerAxios = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (token) {
        instance.defaults.headers.Cookie = `jwt=${token}`;
    }

    return instance;
};