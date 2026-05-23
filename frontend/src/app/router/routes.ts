export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
  },

  PROTECTED: {
    DASHBOARD: '/dashboard',
    
    PATIENTS: {
      LIST: '/patients',
      CREATE: '/patients/new',
      DETAIL: '/patients/:id',
      EDIT: '/patients/:id/edit',
    },

    APPOINTMENTS: {
      LIST: '/appointments',
      CALENDAR: '/appointments/calendar',
      CREATE: '/appointments/new',
      DETAIL: '/appointments/:id',
    },

    STAFF: {
      LIST: '/staff',
      CREATE: '/staff/new',
      DETAIL: '/staff/:id',
    },

    DOCTORS: {
      LIST: '/doctors',
      CREATE: '/doctors/new',
      DETAIL: '/doctors/:id',
    },

    PHARMACY: '/pharmacy',
    BILLING: '/billing',
    REPORTS: '/reports',
    SETTINGS: '/settings',
  },

  ERRORS: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/401',
  },
} as const;

export const buildRoute = (route: string, params: Record<string, string | number>) => {
  let path = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value));
  });
  return path;
};