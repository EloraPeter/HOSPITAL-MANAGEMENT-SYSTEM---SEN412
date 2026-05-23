export type PaymentStatus = 'pending' | 'paid' | 'partial' | 'refunded' | 'cancelled';
export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'insurance' | 'bank_transfer';

export interface Billing {
  id: string;
  appointment_id: string;
  patient_id: string;
  total_amount: number;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod;
  insurance_id?: string;
  invoice_number: string;
  billing_date: string;
  due_date: string;
  paid_date?: string;
  items: BillingItem[];
  created_at: string;
  updated_at: string;
}

export interface BillingItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  policy_number: string;
  coverage_percentage: number;
  contact_phone: string;
  contact_email: string;
}