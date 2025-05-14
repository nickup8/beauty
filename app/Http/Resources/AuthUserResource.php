<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'last_name' => $this->last_name,
            'avatar' => $this->avatar,
            'phone' => $this->phone,
            'email' => $this->email,
            'roles' => $this->getRoleNames(),
            'email_verified_at' => $this->email_verified_at,
        ];
    }
}
