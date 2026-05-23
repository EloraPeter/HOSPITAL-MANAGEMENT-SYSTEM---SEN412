# MediCare Pro - Hospital Management System

A comprehensive, modern Hospital Management System built with React, TypeScript, and Bootstrap. Designed to streamline healthcare operations, enhance patient care, and improve administrative efficiency through an intuitive digital platform.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)
![Zustand](https://img.shields.io/badge/Zustand-4.5-000000?logo=zustand)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

MediCare Pro is a full-featured healthcare management platform that connects patients, doctors, and administrative staff in a unified system. The application facilitates appointment scheduling, patient record management, prescription tracking, billing, and reporting - all from a single, easy-to-use interface.

Built with modern web technologies and following Feature-Sliced Design architecture, the system is scalable, maintainable, and ready for production deployment.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Database Design](#database-design)
- [User Roles & Permissions](#user-roles--permissions)
- [Application Routes](#application-routes)
- [API Integration](#api-integration)
- [Development Guide](#development-guide)
- [License](#license)

---

## Key Features

### Authentication & Security
- Multi-role authentication system with JWT tokens
- Role-based access control with granular permissions
- Session persistence with secure token storage
- Password recovery and reset workflow

### Dashboard & Analytics
- Real-time hospital statistics and key performance indicators
- Daily appointment summaries with status tracking
- Department occupancy monitoring with visual indicators
- Revenue tracking with monthly comparison charts
- Weekly patient admission and discharge flow visualization

### Patient Management
- Complete patient registration with medical history
- Advanced search and filtering capabilities
- Emergency contact and insurance information storage
- Blood group, allergy, and medical condition tracking
- Patient status monitoring (admitted, discharged, under observation)

### Appointment Scheduling
- Streamlined appointment creation with doctor availability
- Time slot management with conflict prevention
- Appointment status workflow (pending, approved, in-progress, completed)
- Calendar and list view options

### Clinical Features
- Medical record creation and management
- Prescription generation with dosage and refill tracking
- Lab test ordering and result management
- Discharge summary generation with follow-up instructions

### Financial Management
- Automated billing based on appointments and services
- Payment tracking with multiple payment methods
- Insurance verification and claims processing
- Financial reporting and revenue analytics

### User Experience
- Responsive design optimized for desktop and mobile devices
- Intuitive navigation with collapsible sidebar
- Dark and light theme support
- Form validation with real-time feedback
- Toast notifications for system events

---

## Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend Framework** | React 18 | User interface component library |
| **Language** | TypeScript 5.4 | Type-safe development |
| **Build Tool** | Vite 5 | Fast development and building |
| **UI Framework** | Bootstrap 5.3 | Responsive layout and components |
| **CSS Preprocessor** | SCSS/Sass | Advanced styling with variables and mixins |
| **State Management** | Zustand 4.5 | Lightweight global state |
| **Routing** | React Router 6 | Client-side navigation |
| **Form Handling** | React Hook Form 7 | Performant form management |
| **Validation** | Zod 3.23 | Schema-based validation |
| **HTTP Client** | Axios 1.7 | API communication |
| **Icons** | Bootstrap Icons, Lucide React | UI icons |
| **Notifications** | React Toastify | Toast messages |
| **Date Utilities** | date-fns 3.6 | Date manipulation |

---

## Project Architecture

The project follows **Feature-Sliced Design**, a modern architectural methodology for frontend applications that emphasizes separation of concerns and scalability.

### Layer Structure
