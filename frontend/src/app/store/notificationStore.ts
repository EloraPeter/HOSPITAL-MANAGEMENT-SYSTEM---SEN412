import { create } from 'zustand';
import type { Notification, NotificationStats } from '@/features/notifications/model/notification.types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  stats: NotificationStats | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

interface NotificationActions {
  setNotifications: (notifications: Notification[]) => void;
  setUnreadCount: (count: number) => void;
  setStats: (stats: NotificationStats) => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>()(
  (set, get) => ({
    notifications: [],
    unreadCount: 0,
    stats: null,
    isOpen: false,
    isLoading: false,
    error: null,

    setNotifications: (notifications) => {
      set({
        notifications,
        unreadCount: notifications.filter(n => n.status === 'unread').length,
      });
    },

    setUnreadCount: (count) => set({ unreadCount: count }),
    setStats: (stats) => set({ stats }),
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    setOpen: (open) => set({ isOpen: open }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    markAsRead: (id) => {
      set((state) => {
        const notifications = state.notifications.map((n) =>
          n.id === id ? { ...n, status: 'read' as const, read_at: new Date().toISOString() } : n
        );
        return {
          notifications,
          unreadCount: notifications.filter(n => n.status === 'unread').length,
        };
      });
    },

    markAllAsRead: () => {
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          status: 'read' as const,
          read_at: n.read_at || new Date().toISOString(),
        })),
        unreadCount: 0,
      }));
    },

    removeNotification: (id) => {
      set((state) => {
        const notifications = state.notifications.filter((n) => n.id !== id);
        return {
          notifications,
          unreadCount: notifications.filter(n => n.status === 'unread').length,
        };
      });
    },

    addNotification: (notification) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + (notification.status === 'unread' ? 1 : 0),
      }));
    },
  })
);