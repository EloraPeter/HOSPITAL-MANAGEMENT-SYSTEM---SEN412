import type { Notification, NotificationFilters, NotificationStats } from './notification.types';
import { dummyNotifications, dummyNotificationStats } from '../lib/notificationDummyData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const notificationService = {
  getAll: async (filters?: NotificationFilters): Promise<Notification[]> => {
    await delay(500);
    let notifications = [...dummyNotifications];
    
    if (filters?.type) {
      notifications = notifications.filter(n => n.type === filters.type);
    }
    if (filters?.status) {
      notifications = notifications.filter(n => n.status === filters.status);
    }
    if (filters?.priority) {
      notifications = notifications.filter(n => n.priority === filters.priority);
    }
    
    return notifications;
  },

  getUnread: async (): Promise<Notification[]> => {
    await delay(300);
    return dummyNotifications.filter(n => n.status === 'unread');
  },

  getStats: async (): Promise<NotificationStats> => {
    await delay(300);
    return dummyNotificationStats;
  },

  markAsRead: async (id: string): Promise<void> => {
    await delay(200);
    const notification = dummyNotifications.find(n => n.id === id);
    if (notification) {
      notification.status = 'read';
      notification.read_at = new Date().toISOString();
    }
  },

  markAllAsRead: async (): Promise<void> => {
    await delay(400);
    dummyNotifications.forEach(n => {
      if (n.status === 'unread') {
        n.status = 'read';
        n.read_at = new Date().toISOString();
      }
    });
  },

  deleteNotification: async (id: string): Promise<void> => {
    await delay(200);
    const index = dummyNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
      dummyNotifications.splice(index, 1);
    }
  },
};