# 🏥 MediCare Pro - Hospital Management System

A comprehensive, modern Hospital Management System built with React, TypeScript, and Bootstrap. Designed to streamline healthcare operations with a clean, intuitive interface.

![MediCare Pro](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)
![Zustand](https://img.shields.io/badge/Zustand-4.5-000000?logo=zustand)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [User Roles](#-user-roles)
- [Pages](#-pages)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- Role-based access control (Admin, Doctor, Nurse, Patient, etc.)
- JWT token authentication
- Password recovery flow
- Session persistence

### 📊 Dashboard
- Real-time hospital statistics
- Today's appointments overview
- Department occupancy tracking
- Revenue analytics with charts
- Weekly patient flow visualization
- Recent patient admissions

### 👨‍⚕️ Patient Management
- Patient registration with modal forms
- Search and filter patients
- Medical history tracking
- Emergency contact management
- Blood group and allergy records

### 📅 Appointment Scheduling
- Create/Edit/Cancel appointments
- Doctor availability tracking
- Time slot management
- Appointment status workflow
- Calendar view

### 👩‍⚕️ Doctor Management
- Doctor profiles and schedules
- Specialty and department assignment
- Availability status tracking
- License verification

### 💊 Pharmacy
- Prescription management
- Drug inventory tracking
- Dispense medication workflow
- Refill management

### 💰 Billing & Invoicing
- Generate invoices
- Payment tracking
- Insurance verification
- Financial reports

### 📈 Reports & Analytics
- Financial reports
- Patient statistics
- Operational analytics
- Custom report generation

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Adaptive sidebar
- Responsive tables and cards

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Bootstrap 5.3, SCSS |
| **State Management** | Zustand |
| **Routing** | React Router 6 |
| **Form Validation** | React Hook Form + Zod |
| **HTTP Client** | Axios |
| **Icons** | Bootstrap Icons, Lucide React |
| **Notifications** | React Toastify |
| **Date Handling** | date-fns |

---

## 📁 Project Structure
hospital-management-system/
├── public/
│ └── assets/
│ ├── images/
│ └── icons/
│
├── src/
│ ├── app/ # Application layer
│ │ ├── providers/ # Context providers
│ │ ├── router/ # Route configuration
│ │ └── store/ # Zustand stores
│ │
│ ├── pages/ # Page components
│ │ ├── auth/ # Login, Register pages
│ │ ├── dashboard/ # Dashboard page
│ │ ├── patients/ # Patient list/detail pages
│ │ ├── appointments/ # Appointment pages
│ │ ├── staff/ # Staff management
│ │ ├── pharmacy/ # Pharmacy pages
│ │ ├── billing/ # Billing pages
│ │ ├── reports/ # Reports pages
│ │ └── errors/ # Error pages (404, etc.)
│ │
│ ├── features/ # Feature modules (business logic)
│ │ ├── auth/ # Authentication feature
│ │ ├── patient-records/ # Patient management
│ │ ├── appointment-scheduling/
│ │ ├── prescription/ # Prescription feature
│ │ ├── medical-history/ # Medical records
│ │ └── notifications/ # Notification system
│ │
│ ├── entities/ # Business entities
│ │ ├── user/ # User types & constants
│ │ ├── patient/ # Patient types & constants
│ │ ├── doctor/ # Doctor types & constants
│ │ ├── appointment/ # Appointment types & constants
│ │ ├── prescription/ # Prescription types
│ │ ├── lab/ # Lab test types
│ │ ├── billing/ # Billing & invoice types
│ │ └── dischargeSummary/ # Discharge summary types
│ │
│ ├── widgets/ # Composite components
│ │ ├── sidebar/ # Navigation sidebar
│ │ ├── header/ # Top header bar
│ │ ├── search/ # Global search
│ │ └── footer/ # Footer component
│ │
│ ├── shared/ # Shared resources
│ │ ├── ui/ # Reusable UI components
│ │ │ ├── layout/ # MainLayout, AuthLayout
│ │ │ ├── forms/ # Form inputs, selects
│ │ │ ├── feedback/ # Loading, errors, empty states
│ │ │ └── data-display/ # Tables, badges, stat cards
│ │ ├── lib/ # Utilities
│ │ ├── api/ # API client
│ │ ├── hooks/ # Custom hooks
│ │ ├── types/ # Shared TypeScript types
│ │ └── constants/ # App constants
│ │
│ └── styles/ # Global styles
│ ├── index.scss # Main stylesheet
│ ├── variables.scss # SCSS variables
│ └── mixins.scss # SCSS mixins
│
├── .env # Environment variables
├── .env.example # Environment template
├── vite.config.ts # Vite configuration
├── tsconfig.json # TypeScript config
└── package.json # Dependencies