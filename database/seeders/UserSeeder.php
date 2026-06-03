<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name'              => 'System Admin',
            'email'             => 'admin@hospital.com',
            'password'          => Hash::make('password123'),
            'role'              => 'admin',
            'phone'             => '08000000001',
            'is_active'         => true,
            'email_verified_at' => now(),
        ]);

        // Doctor
        User::create([
            'name'              => 'Dr. James Smith',
            'email'             => 'doctor@hospital.com',
            'password'          => Hash::make('password123'),
            'role'              => 'doctor',
            'phone'             => '08000000002',
            'is_active'         => true,
            'email_verified_at' => now(),
        ]);

        // Nurse
        User::create([
            'name'              => 'Nurse Mary Johnson',
            'email'             => 'nurse@hospital.com',
            'password'          => Hash::make('password123'),
            'role'              => 'nurse',
            'phone'             => '08000000003',
            'is_active'         => true,
            'email_verified_at' => now(),
        ]);

        // Receptionist
        User::create([
            'name'              => 'Sarah Reception',
            'email'             => 'receptionist@hospital.com',
            'password'          => Hash::make('password123'),
            'role'              => 'receptionist',
            'phone'             => '08000000004',
            'is_active'         => true,
            'email_verified_at' => now(),
        ]);

        // Patient
        User::create([
            'name'              => 'John Patient',
            'email'             => 'patient@hospital.com',
            'password'          => Hash::make('password123'),
            'role'              => 'patient',
            'phone'             => '08000000005',
            'is_active'         => true,
            'email_verified_at' => now(),
        ]);
    }
}