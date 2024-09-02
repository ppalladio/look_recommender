'use client';
import { Toaster } from 'react-hot-toast';
import HomePage from '@/app/components/Home/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export default function Home() {
    return (
        <>
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <HomePage />
            </QueryClientProvider>
        </>
    );
}
