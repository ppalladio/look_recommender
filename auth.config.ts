import Github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';

import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { SignInFormSchema } from './components/auth/auth.config';
import prisma from './lib/prisma';
import { getUserByEmail } from './app/hooks/getUser';
import { compare } from 'bcryptjs';
import { AuthError } from 'next-auth';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const { email, password } = SignInFormSchema.parse(credentials);
                    if (!email || !password) throw new Error('Missing credentials');
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) throw new Error('User not found, check your email or try other sign in options');
                    const passwordMatch = await compare(password, user.password);
                    if (!passwordMatch) throw new Error('Invalid password');
                    return user;
                } catch (error) {
                    throw new AuthError({
                        type: 'CredentialsSignin',
                        message: error instanceof Error ? error.message : 'Authentication failed',
                    });
                }
            },
        }),
        google,
        Github,
    ],
} satisfies NextAuthConfig;
