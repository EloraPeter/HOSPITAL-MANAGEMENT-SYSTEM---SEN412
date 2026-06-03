<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * List all appointments
     */
    public function index(): JsonResponse
    {
        $appointments = Appointment::with([
                            'patient.user',
                            'doctor.user'
                        ])
                        ->latest()
                        ->paginate(15);

        return response()->json([
            'data' => AppointmentResource::collection($appointments),
            'meta' => [
                'total'        => $appointments->total(),
                'per_page'     => $appointments->perPage(),
                'current_page' => $appointments->currentPage(),
                'last_page'    => $appointments->lastPage(),
            ],
        ]);
    }

    /**
     * Create a new appointment
     */
    public function store(AppointmentRequest $request): JsonResponse
    {
        // Check if doctor is already booked at this time
        $exists = Appointment::where('doctor_id',        $request->doctor_id)
                             ->where('appointment_date', $request->appointment_date)
                             ->where('time_slot',        $request->time_slot)
                             ->whereNotIn('status', ['cancelled', 'no_show'])
                             ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This doctor already has an appointment at this time.',
            ], 422);
        }

        $appointment = Appointment::create([
            'patient_id'       => $request->patient_id,
            'doctor_id'        => $request->doctor_id,
            'appointment_date' => $request->appointment_date,
            'time_slot'        => $request->time_slot,
            'status'           => $request->status ?? 'scheduled',
            'notes'            => $request->notes,
        ]);

        return response()->json([
            'message' => 'Appointment created successfully.',
            'data'    => new AppointmentResource(
                $appointment->load(['patient.user', 'doctor.user'])
            ),
        ], 201);
    }

    /**
     * Show a single appointment
     */
    public function show(Appointment $appointment): JsonResponse
    {
        return response()->json([
            'data' => new AppointmentResource(
                $appointment->load(['patient.user', 'doctor.user'])
            ),
        ]);
    }

    /**
     * Update an appointment
     */
    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        // If changing date/time check for conflicts
        if ($request->appointment_date || $request->time_slot) {
            $date     = $request->appointment_date ?? $appointment->appointment_date;
            $timeSlot = $request->time_slot        ?? $appointment->time_slot;

            $exists = Appointment::where('doctor_id',        $appointment->doctor_id)
                                 ->where('appointment_date', $date)
                                 ->where('time_slot',        $timeSlot)
                                 ->where('id', '!=',         $appointment->id)
                                 ->whereNotIn('status', ['cancelled', 'no_show'])
                                 ->exists();

            if ($exists) {
                return response()->json([
                    'message' => 'This doctor already has an appointment at this time.',
                ], 422);
            }
        }

        $appointment->update([
            'appointment_date' => $request->appointment_date ?? $appointment->appointment_date,
            'time_slot'        => $request->time_slot        ?? $appointment->time_slot,
            'status'           => $request->status           ?? $appointment->status,
            'notes'            => $request->notes            ?? $appointment->notes,
        ]);

        return response()->json([
            'message' => 'Appointment updated successfully.',
            'data'    => new AppointmentResource(
                $appointment->load(['patient.user', 'doctor.user'])
            ),
        ]);
    }

    /**
     * Cancel an appointment
     */
    public function destroy(Appointment $appointment): JsonResponse
    {
        $appointment->update(['status' => 'cancelled']);
        $appointment->delete();

        return response()->json([
            'message' => 'Appointment cancelled successfully.',
        ]);
    }
}