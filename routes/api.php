<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PatientController;
use Illuminate\Support\Facades\Route;

// -------------------------------------------------------
// Public routes - no token needed
// -------------------------------------------------------
Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// -------------------------------------------------------
// Protected auth routes - token required
// -------------------------------------------------------
Route::prefix('v1/auth')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/me',      [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

// -------------------------------------------------------
// Admin only routes
// -------------------------------------------------------
Route::prefix('v1')
    ->middleware(['auth:sanctum', 'role:admin'])
    ->group(function () {
        Route::get('/admin/dashboard', function () {
            return response()->json([
                'message' => 'Welcome Admin. You have full access.',
            ]);
        });

        // Doctor management - admin only
        Route::post('/doctors',            [DoctorController::class, 'store']);
        Route::put('/doctors/{doctor}',    [DoctorController::class, 'update']);
        Route::delete('/doctors/{doctor}', [DoctorController::class, 'destroy']);
    });

// -------------------------------------------------------
// Patient routes
// admin + receptionist = full access
// doctor + nurse = view only
// -------------------------------------------------------
Route::prefix('v1')
    ->middleware(['auth:sanctum', 'role:admin,receptionist'])
    ->group(function () {
        Route::post('/patients',             [PatientController::class, 'store']);
        Route::put('/patients/{patient}',    [PatientController::class, 'update']);
        Route::delete('/patients/{patient}', [PatientController::class, 'destroy']);
    });

Route::prefix('v1')
    ->middleware(['auth:sanctum', 'role:admin,receptionist,doctor,nurse'])
    ->group(function () {
        Route::get('/patients',           [PatientController::class, 'index']);
        Route::get('/patients/{patient}', [PatientController::class, 'show']);

        // Doctor viewing - all clinical staff
        Route::get('/doctors',          [DoctorController::class, 'index']);
        Route::get('/doctors/{doctor}', [DoctorController::class, 'show']);
    });

// -------------------------------------------------------
// Appointment routes
// admin + receptionist = full access
// doctor + nurse = view and update status only
// -------------------------------------------------------
Route::prefix('v1')
    ->middleware(['auth:sanctum', 'role:admin,receptionist'])
    ->group(function () {
        Route::post('/appointments',               [AppointmentController::class, 'store']);
        Route::delete('/appointments/{appointment}', [AppointmentController::class, 'destroy']);
    });

Route::prefix('v1')
    ->middleware(['auth:sanctum', 'role:admin,receptionist,doctor,nurse'])
    ->group(function () {
        Route::get('/appointments',                [AppointmentController::class, 'index']);
        Route::get('/appointments/{appointment}',  [AppointmentController::class, 'show']);
        Route::put('/appointments/{appointment}',  [AppointmentController::class, 'update']);
    });