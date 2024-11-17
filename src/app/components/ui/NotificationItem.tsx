"use client";

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Notification, markNotificationAsRead } from '@/services/notification.service';

interface NotificationProps {
  notification: Notification;
  token?: string;
  onStatusChange: (updatedNotification: Notification) => void; 
}

const NotificationItem: React.FC<NotificationProps> = ({
  notification,
  token,
  onStatusChange,
}) => {
  const [loading, setLoading] = useState(false);
  const formattedDate = format(new Date(notification.timestamp), 'PPP, p');

  const handleToggleStatus = async () => {
    try {
      setLoading(true);
      const updatedNotification = await markNotificationAsRead(
        notification.notificationId,
        token
      );
      onStatusChange(updatedNotification);
    } catch (error) {
      console.error('Error al actualizar la notificación:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg mb-4 shadow-md transition ${
        notification.status === 'unread'
          ? 'bg-red-100 border-l-4 border-red-500'
          : 'bg-green-100 border-l-4 border-green-500'
      }`}
    >
      <p className="text-gray-600">{notification.message}</p>
      <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
      <button
        onClick={handleToggleStatus}
        disabled={loading}
        className={`mt-2 px-4 py-2 rounded text-white font-semibold ${
          notification.status === 'unread'
            ? 'bg-red-500 hover:bg-red-600'
            : 'hidden'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Procesando...' : notification.status === 'unread' ? 'Marcar como leído' : 'Leído'}
      </button>
    </div>
  );
};

export default NotificationItem;
