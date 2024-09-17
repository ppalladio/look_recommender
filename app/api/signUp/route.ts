import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    if (!req.body) {
        return new NextResponse(JSON.stringify({ message: 'No body', status: 400 }), { headers: { 'Content-Type': 'application/json' } });
    }
    const data = await req.json();

    const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingEmail) {
        return new NextResponse(JSON.stringify({ message: 'Email already exists' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const existingUsername = await prisma.user.findUnique({
        where: { username: data.username },
    });

    if (existingUsername) {
        return new NextResponse(JSON.stringify({ message: 'Username already exists' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const SALT_ROUNDS = 12;
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
        },
    });
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
}
