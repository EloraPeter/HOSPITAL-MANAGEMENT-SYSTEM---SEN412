import { useEffect, useCallback } from 'react';
import { notificationService } from './notification.service';
import { useNotificationStore } from '@/app/store/notificationStore';

export const useNotifications = () => {
  const store = useNotificationStore();

  const fetchNotifications = useCallback(async () => {
    store.setLoading(true);
    store.setError(null);
    try {
      const [notifications, stats] = await Promise.all([
        notificationService.getAll(),
        notificationService.getStats(),
      ]);
      store.setNotifications(notifications);
      store.setStats(stats);
    } catch (err) {
      store.setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      store.setLoading(false);
    }
  }, []);

  const handleMarkAsRead = useCallback(async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      store.markAsRead(id);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      store.markAllAsRead();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      store.removeNotification(id);
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications: store.notifications,
    unreadCount: store.unreadCount,
    stats: store.stats,
    isOpen: store.isOpen,
    isLoading: store.isLoading,
    error: store.error,
    toggleOpen: store.toggleOpen,
    setOpen: store.setOpen,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    deleteNotification: handleDelete,
    refresh: fetchNotifications,
  };
};