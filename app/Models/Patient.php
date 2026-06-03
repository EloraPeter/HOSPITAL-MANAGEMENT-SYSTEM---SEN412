<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'date_of_birth',
        'blood_type',
        'emergency_contact',
        'emergency_contact_phone',
        'allergies',
        'address',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
        ];
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    // A patient belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A patient has many appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // A patient has many medical records
    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }

    // A patient has many bills
    public function bills()
    {
        return $this->hasMany(Billing::class);
    }
}