<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patient_id'       => ['required', 'exists:patients,id'],
            'doctor_id'        => ['required', 'exists:doctors,id'],
            'appointment_date' => ['required', 'date', 'after_or_equal:today'],
            'time_slot'        => ['required', 'date_format:H:i'],
            'status'           => ['nullable', 'in:scheduled,confirmed,completed,cancelled,no_show'],
            'notes'            => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'patient_id.exists'       => 'Selected patient does not exist.',
            'doctor_id.exists'        => 'Selected doctor does not exist.',
            'appointment_date.after_or_equal' => 'Appointment date cannot be in the past.',
            'time_slot.date_format'   => 'Time slot must be in HH:MM format e.g 09:00.',
        ];
    }
}