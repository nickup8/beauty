import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import ProfileLayout from '@/layouts/profile/profile-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    last_name?: string;
    email: string;
    username: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful, isDirty, setDefaults } = useForm<ProfileForm>({
        name: auth.user.name,
        last_name: auth.user.last_name,
        email: auth.user.email,
        username: auth.user.username,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // Обновляем форму новыми данными и сбрасываем dirty-состояние
                setDefaults({
                    name: data.name,
                    last_name: data.last_name,
                    email: data.email,
                    username: data.username,
                });
            },
        });
    };

    const getInitials = useInitials();

    return (
        <ProfileLayout>
            <Head title="Profile settings" />

            <div className="max-w-xl space-y-6">
                <HeadingSmall title="Редактирование профиля" description="Измените свой профиль" />
                <Avatar className="h-20 w-20">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback className="bg-muted text-3xl">
                        {auth.user.last_name ? getInitials(auth.user.name + ' ' + auth.user.last_name) : getInitials(auth.user.name)}
                    </AvatarFallback>
                </Avatar>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Имя</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Имя"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Фамилия</Label>

                        <Input
                            id="last_name"
                            className="mt-1 block w-full"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                            placeholder="Введите Фамилию"
                        />

                        <InputError className="mt-2" message={errors.last_name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Никнейм</Label>

                        <Input
                            id="username"
                            className="mt-1 block w-full"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            placeholder="Введите уникальный никнейм"
                        />

                        <InputError className="mt-2" message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>

                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Email address"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null ? (
                        <div>
                            <p className="-mt-4 text-xs text-red-500">
                                Ваш адрес электронной почты не подтверждён. Мы отправили вам письмо с подтверждением.{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    Нажмите здесь, чтобы отправить письмо ещё раз.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    Мы отправили новую ссылку для подтверждения на ваш email.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="-mt-4 text-xs font-medium text-green-600">Ваш адрес электронной почты подтверждён.</div>
                    )}

                    <div className="flex items-center gap-4">
                        {isDirty && (
                            <Button type="submit" disabled={processing}>
                                Сохранить
                            </Button>
                        )}

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Сохранено</p>
                        </Transition>
                    </div>
                </form>
            </div>

            <div className="mt-6 max-w-xl">
                <DeleteUser />
            </div>
        </ProfileLayout>
    );
}
