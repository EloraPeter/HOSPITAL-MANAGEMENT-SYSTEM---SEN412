<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'patient'          => [
                'id'   => $this->patient->id,
                'name' => $this->patient->user->name,
            ],
            'doctor'           => [
                'id'        => $this->doctor->id,
                'name'      => $this->doctor->user->name,
                'specialty' => $this->doctor->specialty,
            ],
            'appointment_date' => $this->appointment_date->toDateString(),
            'time_slot'        => $this->time_slot,
            'status'           => $this->status,
            'notes'            => $this->notes,
            'created_at'       => $this->created_at->toDateTimeString(),
        ];
    }
}