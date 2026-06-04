export type NotificationType = 
  | 'appointment' 
  | 'prescription' 
  | 'lab_result' 
  | 'billing' 
  | 'system' 
  | 'message'
  | 'alert';

export type NotificationPriority = 'high' | 'medium' | 'low';

export type NotificationStatus = 'unread' | 'read' | 'archived';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  link?: string;
  patientName?: string;
  doctorName?: string;
  appointmentDate?: string;
  timeAgo: string;
  created_at: string;
  read_at?: string;
}

export interface NotificationFilters {
  type?: NotificationType;
  status?: NotificationStatus;
  priority?: NotificationPriority;
}

export interface NotificationStats {
  total: number;
  unread: number;
  highPriority: number;
  todayCount: number;
}