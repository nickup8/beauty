import Header from '@/components/app/header';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
