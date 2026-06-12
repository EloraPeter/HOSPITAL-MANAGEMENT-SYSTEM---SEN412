import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarCheck, 
  Flask, 
  Capsule, 
  CashStack, 
  Gear, 
  ChatDots,
  ExclamationTriangle,
  Dot,
  Trash
} from 'react-bootstrap-icons';
import type { Notification } from '../model/notification.types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  appointment: <CalendarCheck size={16} />,
  lab_result: <Flask size={16} />,
  prescription: <Capsule size={16} />,
  billing: <CashStack size={16} />,
  system: <Gear size={16} />,
  message: <ChatDots size={16} />,
  alert: <ExclamationTriangle size={16} />,
};

const typeColors: Record<string, string> = {
  appointment: 'primary',
  lab_result: 'info',
  prescription: 'success',
  billing: 'warning',
  system: 'secondary',
  message: 'primary',
  alert: 'danger',
};

const priorityColors: Record<string, string> = {
  high: 'danger',
  medium: 'warning',
  low: 'secondary',
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const navigate = useNavigate();
  const isUnread = notification.status === 'unread';

  const handleClick = () => {
    if (isUnread) {
      onMarkAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div
      className={`d-flex align-items-start gap-3 p-3 border-bottom cursor-pointer notification-item ${
        isUnread ? 'bg-light' : ''
      }`}
      onClick={handleClick}
      style={{
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f7ff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isUnread ? '#f8f9fa' : 'transparent';
      }}
    >
      {/* Unread indicator */}
      {isUnread && (
        <div className="flex-shrink-0 mt-1">
          <Dot size={20} className="text-primary" />
        </div>
      )}

      {/* Icon */}
      <div
        className={`bg-${typeColors[notification.type]} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
        style={{ width: '38px', height: '38px' }}
      >
        <span className={`text-${typeColors[notification.type]}`}>
          {typeIcons[notification.type]}
        </span>
      </div>

      {/* Content */}
      <div className="flex-grow-1 min-w-0">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p
              className={`mb-0 ${isUnread ? 'fw-semibold' : ''}`}
              style={{ fontSize: '0.85rem' }}
            >
              {notification.title}
            </p>
            <div className="d-flex align-items-center gap-2 mt-0">
              <Badge
                bg={priorityColors[notification.priority]}
                className="py-0"
                style={{ fontSize: '0.6rem' }}
              >
                {notification.priority}
              </Badge>
              <small className="text-muted">{notification.timeAgo}</small>
            </div>
          </div>
          <button
            className="btn btn-link text-muted p-0 ms-2 flex-shrink-0"
            onClick={handleDelete}
            title="Delete notification"
          >
            <Trash size={14} />
          </button>
        </div>
        <p
          className="text-muted mb-0 mt-1 text-truncate"
          style={{ fontSize: '0.8rem', maxWidth: '280px' }}
        >
          {notification.message}
        </p>
        {notification.patientName && (
          <small className="text-primary" style={{ fontSize: '0.75rem' }}>
            Patient: {notification.patientName}
          </small>
        )}
      </div>
    </div>
  );
};