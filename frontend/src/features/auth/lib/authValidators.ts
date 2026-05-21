import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean(),  // Use .default() instead of .optional()
});



export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters'),
    last_name: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character'),
    confirm_password: z.string(),
    role: z
      .enum(['patient', 'doctor', 'admin', 'nurse', 'receptionist', 'pharmacist', 'accountant'])
      .refine((val) => !!val, {
        message: 'Please select a role',
      }),
    date_of_birth: z
      .string()
      .min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female', 'other']).optional(),
    blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    // Doctor-specific fields
    specialty: z.string().optional(),
    department: z.string().optional(),
    license_number: z.string().optional(),
    // Patient-specific fields
    emergency_contact_name: z.string().optional(),
    emergency_contact_phone: z.string().optional(),
    emergency_contact_relationship: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  })
  .refine(
    (data) => {
      if (data.role === 'doctor') {
        return !!data.specialty && !!data.department && !!data.license_number;
      }
      return true;
    },
    {
      message: 'All doctor fields are required',
      path: ['specialty'],
    }
  );

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;