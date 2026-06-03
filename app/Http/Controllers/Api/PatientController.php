<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PatientController extends Controller
{
    /**
     * List all patients (admin, doctor, nurse only)
     */
    public function index(): JsonResponse
    {
        $patients = Patient::with('user')
                           ->latest()
                           ->paginate(15);

        return response()->json([
            'data'  => PatientResource::collection($patients),
            'meta'  => [
                'total'        => $patients->total(),
                'per_page'     => $patients->perPage(),
                'current_page' => $patients->currentPage(),
                'last_page'    => $patients->lastPage(),
            ],
        ]);
    }

    /**
     * Create a new patient
     */
    public function store(PatientRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            // Step 1: Create the user account
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'phone'    => $request->phone,
                'role'     => 'patient',
            ]);

            // Step 2: Create the patient profile
            $patient = Patient::create([
                'user_id'                 => $user->id,
                'date_of_birth'           => $request->date_of_birth,
                'blood_type'              => $request->blood_type,
                'emergency_contact'       => $request->emergency_contact,
                'emergency_contact_phone' => $request->emergency_contact_phone,
                'allergies'               => $request->allergies,
                'address'                 => $request->address,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Patient created successfully.',
                'data'    => new PatientResource($patient->load('user')),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create patient.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show a single patient
     */
    public function show(Patient $patient): JsonResponse
    {
        return response()->json([
            'data' => new PatientResource($patient->load('user')),
        ]);
    }

    /**
     * Update a patient
     */
    public function update(Request $request, Patient $patient): JsonResponse
    {
        DB::beginTransaction();

        try {
            // Update user info
            $patient->user->update([
                'name'  => $request->name  ?? $patient->user->name,
                'phone' => $request->phone ?? $patient->user->phone,
            ]);

            // Update patient profile
            $patient->update([
                'date_of_birth'           => $request->date_of_birth           ?? $patient->date_of_birth,
                'blood_type'              => $request->blood_type              ?? $patient->blood_type,
                'emergency_contact'       => $request->emergency_contact       ?? $patient->emergency_contact,
                'emergency_contact_phone' => $request->emergency_contact_phone ?? $patient->emergency_contact_phone,
                'allergies'               => $request->allergies               ?? $patient->allergies,
                'address'                 => $request->address                 ?? $patient->address,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Patient updated successfully.',
                'data'    => new PatientResource($patient->load('user')),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update patient.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a patient (soft delete)
     */
    public function destroy(Patient $patient): JsonResponse
    {
        $patient->user->delete();
        $patient->delete();

        return response()->json([
            'message' => 'Patient deleted successfully.',
        ]);
    }
}