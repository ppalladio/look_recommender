import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 400 });
    }
    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
        return new NextResponse(JSON.stringify({ message: 'Invalid password' }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ message: 'Sign in successful' }), { status: 200 });
}
