import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Bell, CheckAll, ChevronRight } from 'react-bootstrap-icons';
import { useNotifications } from '../model/useNotifications';
import { NotificationItem } from './NotificationItem';
import { LoadingSpinner } from '@/shared/ui/feedback/LoadingSpinner';

export const NotificationDropdown: React.FC = () => {
  const {
    notifications,
    unreadCount,
    isOpen,
    isLoading,
    toggleOpen,
    setOpen,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  return (
    <div className="position-relative">
      {/* Bell Button */}
      <button
        className="btn btn-light btn-sm rounded-circle position-relative d-flex align-items-center justify-content-center"
        style={{ width: '38px', height: '38px' }}
        onClick={toggleOpen}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle rounded-pill"
            style={{ fontSize: '0.6rem' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1050 }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border"
            style={{
              width: '380px',
              maxHeight: '500px',
              zIndex: 1055,
              right: '-10px',
            }}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <div>
                <h6 className="fw-bold mb-0">Notifications</h6>
                {unreadCount > 0 && (
                  <small className="text-muted">{unreadCount} unread</small>
                )}
              </div>
              <div className="d-flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="link"
                    className="text-decoration-none p-0 text-primary"
                    size="sm"
                    onClick={markAllAsRead}
                  >
                    <CheckAll size={16} className="me-1" />
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
              {isLoading ? (
                <div className="py-5">
                  <LoadingSpinner text="Loading..." size="sm" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-5">
                  <Bell size={40} className="text-muted mb-2" />
                  <p className="text-muted mb-0">No notifications</p>
                  <small className="text-muted">You're all caught up!</small>
                </div>
              ) : (
                notifications.slice(0, 6).map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 6 && (
              <div className="p-2 border-top text-center">
                <button
                  className="btn btn-link text-decoration-none text-primary small"
                  onClick={() => {
                    setOpen(false);
                    // Navigate to full notifications page
                  }}
                >
                  View all notifications
                  <ChevronRight size={14} className="ms-1" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};