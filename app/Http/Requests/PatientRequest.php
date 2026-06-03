<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'                    => ['required', 'string', 'min:2', 'max:100'],
            'email'                   => ['required', 'string', 'email', 'unique:users,email'],
            'password'                => ['required', 'string', 'min:8'],
            'phone'                   => ['nullable', 'string', 'max:20'],
            'date_of_birth'           => ['nullable', 'date', 'before:today'],
            'blood_type'              => ['nullable', 'in:A+,A-,B+,B-,AB+,AB-,O+,O-'],
            'emergency_contact'       => ['nullable', 'string', 'max:100'],
            'emergency_contact_phone' => ['nullable', 'string', 'max:20'],
            'allergies'               => ['nullable', 'string'],
            'address'                 => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'blood_type.in'    => 'Blood type must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-',
            'date_of_birth.before' => 'Date of birth must be in the past.',
        ];
    }
}