import Header from '@/components/app/header';
import Heading from '@/components/heading';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, CircleUser, MessageSquare, Settings, Star } from 'lucide-react';
import { ReactNode } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Профиль',
        href: '/profile',
        icon: CircleUser,
    },
    {
        title: 'Записи',
        href: '/profile/records',
        icon: Calendar,
    },
    {
        title: 'Мои отзывы',
        href: '/profile/reviews',
        icon: Star,
    },
    {
        title: 'Мне отзывы',
        href: '/profile/received-reviews',
        icon: MessageSquare,
    },
    {
        title: 'Настройки',
        href: '/profile/settings',
        icon: Settings,
    },
];
export default function ProfileLayout({ children, breadcrumbs }: { children: ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    const currentPath = window.location.pathname;
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="mx-auto mt-6 flex w-full max-w-[1400px]">
                <Heading title="Ваш профиль" description="На этой странице вы можете управлять своим профилем и настройками" />
            </div>
            <div className="mx-auto mb-6 flex w-full max-w-[1400px] flex-1 gap-4">
                <div className="flex w-48 flex-col gap-1">
                    {sidebarNavItems.map((item, index) => (
                        <Link
                            href={item.href}
                            prefetch
                            key={`${item.href}-${index}`}
                            className={
                                'flex items-center gap-2 rounded-md p-2 text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ' +
                                cn('w-full justify-start', {
                                    'bg-blue-50 text-blue-600': currentPath === item.href,
                                })
                            }
                        >
                            {item.icon && <item.icon className="h-5 w-5" />}
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="w-full flex-1 border-l pl-4">{children}</div>
            </div>
        </div>
    );
}
