// entities/pharmacy/model/pharmacy.constants.ts
export const DRUG_CATEGORIES = {
  antibiotics: 'Antibiotics',
  analgesics: 'Analgesics',
  antacids: 'Antacids',
  antidepressants: 'Antidepressants',
  antihistamines: 'Antihistamines',
  antihypertensives: 'Antihypertensives',
  'anti-inflammatory': 'Anti-inflammatory',
  antiviral: 'Antiviral',
  vaccines: 'Vaccines',
  vitamins: 'Vitamins & Supplements',
} as const;

export const DRUG_FORMS = {
  tablet: 'Tablet',
  capsule: 'Capsule',
  syrup: 'Syrup',
  injection: 'Injection',
  cream: 'Cream',
  ointment: 'Ointment',
  drops: 'Drops',
  inhaler: 'Inhaler',
  spray: 'Spray',
} as const;

export const PRESCRIPTION_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  dispensed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800',
} as const;

export const STOCK_STATUS = {
  LOW: 'low',
  OPTIMAL: 'optimal', 
  OVERSTOCKED: 'overstocked',
  OUT_OF_STOCK: 'out_of_stock',
} as const;