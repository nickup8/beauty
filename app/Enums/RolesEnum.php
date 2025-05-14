<?php

namespace App\Enums;

enum RolesEnum: string
{
    case CLIENT = 'client';
    case MASTER = 'master';
    case ADMIN = 'admin';

    public static function labels(): array
    {
        return [
            self::CLIENT->value => 'Пользователь',
            self::MASTER->value => 'Мастер',
            self::ADMIN->value => 'Администратор',
        ];
    }

    public function label(): string
    {
        return match ($this) {
            self::CLIENT => 'Пользователь',
            self::MASTER => 'Мастер',
            self::ADMIN => 'Администратор',
        };
    }

}
