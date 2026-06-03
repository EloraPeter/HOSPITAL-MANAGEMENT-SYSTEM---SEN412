<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                      => $this->id,
            'user_id'                 => $this->user_id,
            'name'                    => $this->user->name,
            'email'                   => $this->user->email,
            'phone'                   => $this->user->phone,
            'date_of_birth'           => $this->date_of_birth?->toDateString(),
            'blood_type'              => $this->blood_type,
            'emergency_contact'       => $this->emergency_contact,
            'emergency_contact_phone' => $this->emergency_contact_phone,
            'allergies'               => $this->allergies,
            'address'                 => $this->address,
            'created_at'              => $this->created_at->toDateTimeString(),
        ];
    }
}