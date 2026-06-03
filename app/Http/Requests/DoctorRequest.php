<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DoctorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'           => ['required', 'string', 'min:2', 'max:100'],
            'email'          => ['required', 'string', 'email', 'unique:users,email'],
            'password'       => ['required', 'string', 'min:8'],
            'phone'          => ['nullable', 'string', 'max:20'],
            'specialty'      => ['required', 'string', 'max:100'],
            'license_number' => ['required', 'string', 'unique:doctors,license_number'],
            'bio'            => ['nullable', 'string'],
            'status'         => ['nullable', 'in:available,unavailable,on_leave'],
        ];
    }

    public function messages(): array
    {
        return [
            'license_number.unique' => 'This license number is already registered.',
            'specialty.required'    => 'Doctor specialty is required.',
        ];
    }
}