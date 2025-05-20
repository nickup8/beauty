import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import ProfileLayout from '@/layouts/profile/profile-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { MailIcon, PencilIcon, PhoneIcon } from 'lucide-react';

export default function Profile() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Личный кабинет',
            href: '/profile',
        },
    ];
    const user = usePage<SharedData>().props.auth.user;
    const getInitials = useInitials();
    return (
        <ProfileLayout breadcrumbs={breadcrumbs}>
            <Head title="Ваш профиль" />
            <HeadingSmall title="Учетные данные" description="Вы самостоятельно выбираете, какие контактные данные будут отображаться" />
            <Card className="mt-6 max-w-xl p-6">
                <CardContent className="flex items-start space-x-6">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-muted text-xl">
                            {getInitials(user.last_name ? user.name + ' ' + user.last_name : user.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                        <div>
                            <p className="text-muted-foreground text-sm">Имя</p>
                            <p className="text-lg font-medium">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Фамилия</p>
                            <p className="text-lg font-medium">{user.last_name ? user.last_name : 'Не указана'}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <MailIcon className="text-muted-foreground h-4 w-4" />
                            <p className="text-sm font-medium">{user.email}</p>
                            {user.email_verified_at ? (
                                <Badge className="bg-green-500">Подтверждено</Badge>
                            ) : (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge variant="destructive">Не подтверждено</Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>Для завершения регистрации подтвердите вашу почту. Письмо уже отправлено</TooltipContent>
                                </Tooltip>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <PhoneIcon className="text-muted-foreground h-4 w-4" />
                            {user.phone ? (
                                <>
                                    <p className="text-sm font-medium">{user.phone}</p>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="text-muted-foreground text-sm italic">Скрыт</span>
                                        </TooltipTrigger>
                                        <TooltipContent>Ваш номер скрыт от других пользователей</TooltipContent>
                                    </Tooltip>
                                </>
                            ) : (
                                <p className="text-muted-foreground text-sm italic">Не указан</p>
                            )}
                        </div>

                        <Button asChild variant="default" className="mt-4">
                            <Link href={route('profile.edit')}>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Редактировать данные
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </ProfileLayout>
    );
}
