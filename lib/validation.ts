import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .min(10, 'Phone number too short')
    .max(15, 'Phone number too long')
    .refine((val) => {
      // Remove spaces and dashes
      const cleaned = val.replace(/[\s-]/g, '');
      
      // Accept 10-digit numbers starting with 0 (e.g., "0751406993")
      if (/^0[17]\d{8}$/.test(cleaned) || /^0[2-9]\d{8}$/.test(cleaned)) {
        return true;
      }
      
      // Accept international format with +254 (e.g., "+254751406993")
      if (/^\+254[17]\d{8}$/.test(cleaned) || /^\+254[2-9]\d{8}$/.test(cleaned)) {
        return true;
      }
      
      // Accept format without + (e.g., "254751406993")
      if (/^254[17]\d{8}$/.test(cleaned) || /^254[2-9]\d{8}$/.test(cleaned)) {
        return true;
      }
      
      return false;
    }, 'Please enter a valid Kenyan phone number (e.g., 0751406993 or +254751406993)'),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  preferredContact: z.enum(['email', 'whatsapp']),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
