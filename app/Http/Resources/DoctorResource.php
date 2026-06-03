<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'user_id'        => $this->user_id,
            'name'           => $this->user->name,
            'email'          => $this->user->email,
            'phone'          => $this->user->phone,
            'specialty'      => $this->specialty,
            'license_number' => $this->license_number,
            'bio'            => $this->bio,
            'status'         => $this->status,
            'created_at'     => $this->created_at->toDateTimeString(),
        ];
    }
}