<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');
            $table->date('date_of_birth')->nullable();
            $table->enum('blood_type', [
                'A+', 'A-',
                'B+', 'B-',
                'AB+', 'AB-',
                'O+', 'O-'
            ])->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('emergency_contact_phone', 20)->nullable();
            $table->text('allergies')->nullable();
            $table->text('address')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};