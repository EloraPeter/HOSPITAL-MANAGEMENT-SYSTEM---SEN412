<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DoctorRequest;
use App\Http\Resources\DoctorResource;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DoctorController extends Controller
{
    /**
     * List all doctors
     */
    public function index(): JsonResponse
    {
        $doctors = Doctor::with('user')
                         ->latest()
                         ->paginate(15);

        return response()->json([
            'data' => DoctorResource::collection($doctors),
            'meta' => [
                'total'        => $doctors->total(),
                'per_page'     => $doctors->perPage(),
                'current_page' => $doctors->currentPage(),
                'last_page'    => $doctors->lastPage(),
            ],
        ]);
    }

    /**
     * Create a new doctor
     */
    public function store(DoctorRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            // Step 1: Create the user account
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'phone'    => $request->phone,
                'role'     => 'doctor',
            ]);

            // Step 2: Create the doctor profile
            $doctor = Doctor::create([
                'user_id'        => $user->id,
                'specialty'      => $request->specialty,
                'license_number' => $request->license_number,
                'bio'            => $request->bio,
                'status'         => $request->status ?? 'available',
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Doctor created successfully.',
                'data'    => new DoctorResource($doctor->load('user')),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create doctor.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show a single doctor
     */
    public function show(Doctor $doctor): JsonResponse
    {
        return response()->json([
            'data' => new DoctorResource($doctor->load('user')),
        ]);
    }

    /**
     * Update a doctor
     */
    public function update(Request $request, Doctor $doctor): JsonResponse
    {
        DB::beginTransaction();

        try {
            // Update user info
            $doctor->user->update([
                'name'  => $request->name  ?? $doctor->user->name,
                'phone' => $request->phone ?? $doctor->user->phone,
            ]);

            // Update doctor profile
            $doctor->update([
                'specialty'      => $request->specialty      ?? $doctor->specialty,
                'license_number' => $request->license_number ?? $doctor->license_number,
                'bio'            => $request->bio            ?? $doctor->bio,
                'status'         => $request->status         ?? $doctor->status,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Doctor updated successfully.',
                'data'    => new DoctorResource($doctor->load('user')),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update doctor.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a doctor (soft delete)
     */
    public function destroy(Doctor $doctor): JsonResponse
    {
        $doctor->user->delete();
        $doctor->delete();

        return response()->json([
            'message' => 'Doctor deleted successfully.',
        ]);
    }
}