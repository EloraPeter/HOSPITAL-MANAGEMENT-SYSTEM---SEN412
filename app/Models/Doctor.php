<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'specialty',
        'license_number',
        'bio',
        'status',
    ];

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    // A doctor belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A doctor has many appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // A doctor has many medical records
    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }
}