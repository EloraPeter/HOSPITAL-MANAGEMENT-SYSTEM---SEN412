# Hospital Management System — API Documentation
> For React Frontend Developers
> Base URL: `http://127.0.0.1:8000/api/v1`

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Roles & Permissions](#roles--permissions)
4. [Patients](#patients)
5. [Doctors](#doctors)
6. [Appointments](#appointments)
7. [Error Handling](#error-handling)
8. [React Setup Guide](#react-setup-guide)

---

## Getting Started

### Base URL
```
http://127.0.0.1:8000/api/v1
```

### Required Headers
Every request must include these headers:
```
Accept: application/json
Content-Type: application/json
```

Protected routes also require:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### How Tokens Work
1. User logs in → API returns a token
2. Store the token (localStorage or React context)
3. Send the token in every protected request header
4. On logout → token is deleted from server

---

## Authentication

### Register
Creates a new user account. Default role is `patient`.

```
POST /auth/register
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "08012345678"
}
```

**Success Response — 201:**
```json
{
    "message": "Account created successfully.",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "08012345678",
            "role": "patient",
            "is_active": true,
            "created_at": "2026-06-03 00:00:00"
        },
        "token": "1|xxxxxxxxxxxxxxxxxxxxxxxx"
    }
}
```

**Validation Error — 422:**
```json
{
    "message": "The email has already been taken.",
    "errors": {
        "email": ["The email has already been taken."]
    }
}
```

---

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
    "email": "admin@hospital.com",
    "password": "password123"
}
```

**Success Response — 200:**
```json
{
    "message": "Login successful.",
    "data": {
        "user": {
            "id": 1,
            "name": "System Admin",
            "email": "admin@hospital.com",
            "phone": "08000000001",
            "role": "admin",
            "is_active": true,
            "created_at": "2026-06-03 00:00:00"
        },
        "token": "1|xxxxxxxxxxxxxxxxxxxxxxxx"
    }
}
```

**Wrong Credentials — 422:**
```json
{
    "message": "The provided credentials are incorrect.",
    "errors": {
        "email": ["The provided credentials are incorrect."]
    }
}
```

**Deactivated Account — 403:**
```json
{
    "message": "Your account has been deactivated. Contact an administrator."
}
```

---

### Get Logged In User
Returns the profile of the currently authenticated user.

```
GET /auth/me
```
🔒 Requires token

**Success Response — 200:**
```json
{
    "data": {
        "id": 1,
        "name": "System Admin",
        "email": "admin@hospital.com",
        "phone": "08000000001",
        "role": "admin",
        "is_active": true,
        "created_at": "2026-06-03 00:00:00"
    }
}
```

---

### Logout
Deletes the current token. User must login again.

```
POST /auth/logout
```
🔒 Requires token

**Success Response — 200:**
```json
{
    "message": "Logged out successfully."
}
```

---

## Roles & Permissions

Every user has one of these roles:

| Role | Description |
|---|---|
| `admin` | Full access to everything |
| `doctor` | Clinical access, view patients |
| `nurse` | Clinical access, view patients |
| `receptionist` | Manage patients and appointments |
| `patient` | Own data only |

### What each role can do:

| Action | admin | receptionist | doctor | nurse | patient |
|---|---|---|---|---|---|
| Create patient | ✅ | ✅ | ❌ | ❌ | ❌ |
| View patients | ✅ | ✅ | ✅ | ✅ | ❌ |
| Create doctor | ✅ | ❌ | ❌ | ❌ | ❌ |
| View doctors | ✅ | ✅ | ✅ | ✅ | ❌ |
| Create appointment | ✅ | ✅ | ❌ | ❌ | ❌ |
| View appointments | ✅ | ✅ | ✅ | ✅ | ❌ |
| Update appointment | ✅ | ✅ | ✅ | ✅ | ❌ |

### Permission Error — 403:
```json
{
    "message": "Unauthorized. You do not have permission to access this resource.",
    "your_role": "nurse",
    "required_roles": ["admin", "receptionist"]
}
```

---

## Patients

### Create Patient
🔒 Requires token | 👤 Roles: `admin`, `receptionist`

```
POST /patients
```

**Request Body:**
```json
{
    "name": "Emmanuel Okafor",
    "email": "emmanuel@gmail.com",
    "password": "password123",
    "phone": "08012345678",
    "date_of_birth": "1990-05-15",
    "blood_type": "O+",
    "emergency_contact": "Mrs Okafor",
    "emergency_contact_phone": "08087654321",
    "allergies": "Penicillin",
    "address": "12 Lagos Street, Abuja"
}
```

**Required fields:** `name`, `email`, `password`

**Blood type options:** `A+` `A-` `B+` `B-` `AB+` `AB-` `O+` `O-`

**Success Response — 201:**
```json
{
    "message": "Patient created successfully.",
    "data": {
        "id": 1,
        "user_id": 6,
        "name": "Emmanuel Okafor",
        "email": "emmanuel@gmail.com",
        "phone": "08012345678",
        "date_of_birth": "1990-05-15",
        "blood_type": "O+",
        "emergency_contact": "Mrs Okafor",
        "emergency_contact_phone": "08087654321",
        "allergies": "Penicillin",
        "address": "12 Lagos Street, Abuja",
        "created_at": "2026-06-03 00:00:00"
    }
}
```

---

### List All Patients
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
GET /patients
```

**Success Response — 200:**
```json
{
    "data": [...],
    "meta": {
        "total": 50,
        "per_page": 15,
        "current_page": 1,
        "last_page": 4
    }
}
```

**Pagination:** Add `?page=2` to get next page:
```
GET /patients?page=2
```

---

### Get Single Patient
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
GET /patients/{id}
```

**Example:** `GET /patients/1`

---

### Update Patient
🔒 Requires token | 👤 Roles: `admin`, `receptionist`

```
PUT /patients/{id}
```

**Request Body (all fields optional):**
```json
{
    "name": "Emmanuel Okafor Updated",
    "phone": "08099999999",
    "blood_type": "A+",
    "address": "25 Abuja Street, Lagos"
}
```

---

### Delete Patient
🔒 Requires token | 👤 Roles: `admin`, `receptionist`

```
DELETE /patients/{id}
```

**Success Response — 200:**
```json
{
    "message": "Patient deleted successfully."
}
```

---

## Doctors

### Create Doctor
🔒 Requires token | 👤 Roles: `admin`

```
POST /doctors
```

**Request Body:**
```json
{
    "name": "Dr. Chukwuemeka Eze",
    "email": "dr.eze@hospital.com",
    "password": "password123",
    "phone": "08011111111",
    "specialty": "Cardiology",
    "license_number": "MED-2024-001",
    "bio": "Experienced cardiologist with 10 years of practice.",
    "status": "available"
}
```

**Required fields:** `name`, `email`, `password`, `specialty`, `license_number`

**Status options:** `available` `unavailable` `on_leave`

**Success Response — 201:**
```json
{
    "message": "Doctor created successfully.",
    "data": {
        "id": 1,
        "user_id": 9,
        "name": "Dr. Chukwuemeka Eze",
        "email": "dr.eze@hospital.com",
        "phone": "08011111111",
        "specialty": "Cardiology",
        "license_number": "MED-2024-001",
        "bio": "Experienced cardiologist with 10 years of practice.",
        "status": "available",
        "created_at": "2026-06-03 00:00:00"
    }
}
```

---

### List All Doctors
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
GET /doctors
```

---

### Get Single Doctor
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
GET /doctors/{id}
```

---

### Update Doctor
🔒 Requires token | 👤 Roles: `admin`

```
PUT /doctors/{id}
```

---

### Delete Doctor
🔒 Requires token | 👤 Roles: `admin`

```
DELETE /doctors/{id}
```

---

## Appointments

### Create Appointment
🔒 Requires token | 👤 Roles: `admin`, `receptionist`

```
POST /appointments
```

**Request Body:**
```json
{
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2026-06-10",
    "time_slot": "09:00",
    "status": "scheduled",
    "notes": "First consultation for chest pain"
}
```

**Required fields:** `patient_id`, `doctor_id`, `appointment_date`, `time_slot`

**Status options:** `scheduled` `confirmed` `completed` `cancelled` `no_show`

**Time format:** `HH:MM` — example: `09:00`, `14:30`

**Date format:** `YYYY-MM-DD` — example: `2026-06-10`

**Success Response — 201:**
```json
{
    "message": "Appointment created successfully.",
    "data": {
        "id": 1,
        "patient": {
            "id": 1,
            "name": "Emmanuel Okafor"
        },
        "doctor": {
            "id": 1,
            "name": "Dr. Chukwuemeka Eze",
            "specialty": "Cardiology"
        },
        "appointment_date": "2026-06-10",
        "time_slot": "09:00",
        "status": "scheduled",
        "notes": "First consultation for chest pain",
        "created_at": "2026-06-03 00:00:00"
    }
}
```

**Double Booking Error — 422:**
```json
{
    "message": "This doctor already has an appointment at this time."
}
```

---

### List All Appointments
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
GET /appointments
```

---

### Get Single Appointment
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
GET /appointments/{id}
```

---

### Update Appointment
🔒 Requires token | 👤 Roles: `admin`, `receptionist`, `doctor`, `nurse`

```
PUT /appointments/{id}
```

**Request Body (all fields optional):**
```json
{
    "appointment_date": "2026-06-15",
    "time_slot": "10:00",
    "status": "confirmed",
    "notes": "Updated notes"
}
```

---

### Cancel Appointment
🔒 Requires token | 👤 Roles: `admin`, `receptionist`

```
DELETE /appointments/{id}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created successfully |
| 401 | Not logged in / token missing or expired |
| 403 | Logged in but not allowed (wrong role) |
| 404 | Record not found |
| 422 | Validation error |
| 500 | Server error |

### 401 Unauthenticated:
```json
{
    "message": "Unauthenticated."
}
```

### 404 Not Found:
```json
{
    "message": "No query results for model [App\\Models\\Patient] 99"
}
```

### 422 Validation Error:
```json
{
    "message": "The name field is required.",
    "errors": {
        "name": ["The name field is required."],
        "email": ["The email field is required."]
    }
}
```

---

## React Setup Guide

### 1. Install Axios
```bash
npm install axios
```

### 2. Create API instance
Create file `src/api/axios.js`:
```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiry globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
```

### 3. Login example
```javascript
import api from '../api/axios';

const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data.data;

        // Save token and user
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    } catch (error) {
        const message = error.response?.data?.message || 'Login failed';
        throw new Error(message);
    }
};
```

### 4. Logout example
```javascript
const logout = async () => {
    try {
        await api.post('/auth/logout');
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
};
```

### 5. Fetch patients example
```javascript
const getPatients = async (page = 1) => {
    const response = await api.get(`/patients?page=${page}`);
    return response.data; // { data: [...], meta: {...} }
};
```

### 6. Create patient example
```javascript
const createPatient = async (patientData) => {
    try {
        const response = await api.post('/patients', patientData);
        return response.data.data;
    } catch (error) {
        // Handle validation errors
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            throw errors;
        }
        throw error;
    }
};
```

### 7. Check user role in React
```javascript
const user = JSON.parse(localStorage.getItem('user'));

// Show button only for admin
{user?.role === 'admin' && (
    <button>Create Doctor</button>
)}

// Show for multiple roles
{['admin', 'receptionist'].includes(user?.role) && (
    <button>Create Patient</button>
)}
```

### 8. Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@hospital.com | password123 |
| Doctor | doctor@hospital.com | password123 |
| Nurse | nurse@hospital.com | password123 |
| Receptionist | receptionist@hospital.com | password123 |
| Patient | patient@hospital.com | password123 |

---

## Coming Soon (Next Phases)

| Phase | Module | Status |
|---|---|---|
| Phase 6 | Medical Records | 🔜 Coming soon |
| Phase 7 | Prescriptions | 🔜 Coming soon |
| Phase 8 | Labs | 🔜 Coming soon |
| Phase 9 | Billing | 🔜 Coming soon |
| Phase 10 | Admissions & Discharge | 🔜 Coming soon |
| Phase 11 | Reporting & Analytics | 🔜 Coming soon |

---

*Documentation last updated: June 2026*
*Backend: Laravel 12 | PHP 8.2 | MySQL*
