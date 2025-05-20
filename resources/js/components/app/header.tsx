import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import AppLogo from '../app-logo';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { UserInfo } from '../user-info';
import { UserMenuContent } from '../user-menu-content';

export default function Header({ className }: { className?: string }) {
    const { auth } = usePage<SharedData>().props;
    const { user } = auth;
    return (
        <header className={'border-b bg-white ' + className}>
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between">
                <Link href={route('home')}>
                    <AppLogo />
                </Link>
                <div>
                    {user ? (
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Bell className="h-6 w-6" />
                                <Badge variant="destructive" className="absolute -top-2 -right-2 rounded-full text-xs">
                                    1
                                </Badge>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex cursor-pointer items-center gap-1 transition duration-200 hover:text-blue-600">
                                        <UserInfo user={user} showEmail />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <UserMenuContent user={user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <Button asChild variant={'ghost'}>
                                <Link className="btn-primary" href={route('login')}>
                                    Вход
                                </Link>
                            </Button>
                            <Button asChild variant={'ghost'}>
                                <Link className="btn-primary" href={route('register')}>
                                    Регистрация
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
