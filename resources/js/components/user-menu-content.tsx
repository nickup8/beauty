import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { CircleUser, LogOut } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')}>
                        <CircleUser className="mr-1" />
                        Личный кабинет
                    </Link>
                </DropdownMenuItem>
                {user.roles.includes('master') && (
                    <DropdownMenuItem asChild>
                        <Link className="block w-full" href={route('profile.edit')}>
                            <CircleUser className="mr-1" />
                            Кабинет мастера
                        </Link>
                    </DropdownMenuItem>
                )}
                {user.roles.includes('admin') && (
                    <DropdownMenuItem asChild>
                        <Link className="block w-full" href={route('profile.edit')}>
                            <CircleUser className="mr-1" />
                            Кабинет компании
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')}>
                    <LogOut className="mr-1" />
                    Выход
                </Link>
            </DropdownMenuItem>
        </>
    );
}
