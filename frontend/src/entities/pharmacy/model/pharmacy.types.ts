// entities/pharmacy/model/pharmacy.types.ts
export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  category: DrugCategory;
  form: DrugForm;
  strength: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  price: {
    cost: number;
    selling: number;
    currency: string;
  };
  inventory: Inventory;
  prescription: PrescriptionRequirement;
  description?: string;
  sideEffects?: string[];
  contraindications?: string[];
  storageConditions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DrugCategory = 
  | 'antibiotics'
  | 'analgesics'
  | 'antacids'
  | 'antidepressants'
  | 'antihistamines'
  | 'antihypertensives'
  | 'anti-inflammatory'
  | 'antiviral'
  | 'vaccines'
  | 'vitamins';

export type DrugForm = 
  | 'tablet'
  | 'capsule'
  | 'syrup'
  | 'injection'
  | 'cream'
  | 'ointment'
  | 'drops'
  | 'inhaler'
  | 'spray';

export interface Inventory {
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  unit: string;
  lastRestocked: Date;
  supplier: Supplier;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  leadTime: number; // days
}

export type PrescriptionRequirement = 
  | 'required'
  | 'not-required'
  | 'controlled-substance';

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  doctorId: string;
  drugs: PrescribedDrug[];
  status: PrescriptionStatus;
  issuedDate: Date;
  validUntil: Date;
  notes?: string;
  pharmacyId?: string;
  dispensedBy?: string;
  dispensedDate?: Date;
}

export interface PrescribedDrug {
  drugId: string;
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  dispensed: boolean;
}

export type PrescriptionStatus = 
  | 'pending'
  | 'processing'
  | 'dispensed'
  | 'cancelled'
  | 'expired';

export interface PharmacyInventory {
  id: string;
  drugId: string;
  batchId: string;
  quantity: number;
  expiryDate: Date;
  location: string;
  receivedDate: Date;
}