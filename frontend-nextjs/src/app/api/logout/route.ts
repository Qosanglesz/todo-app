import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}`);
    response.cookies.set('jwt', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0)
    });
    return response;
}