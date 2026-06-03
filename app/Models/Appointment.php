<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'appointment_date',
        'time_slot',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'appointment_date' => 'date',
        ];
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    // An appointment belongs to a patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // An appointment belongs to a doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    // An appointment has one bill
    public function billing()
    {
        return $this->hasOne(Billing::class);
    }
}