<?php

namespace App\Enums;

enum PermissionsEnum
{
    case CLIENT = 'client';
    case MASTER = 'master';
    case ADMIN = 'admin';
}
