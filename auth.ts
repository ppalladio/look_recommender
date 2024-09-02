import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [credentials, google],
});
