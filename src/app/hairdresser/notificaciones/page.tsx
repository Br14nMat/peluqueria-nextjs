"use client";

import React, { useState, useEffect } from 'react';
import { Notification, getNotificationsByClient } from '@/services/notification.service';
import NotificationItem from '@/app/components/ui/NotificationItem';
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

const NotificationList= () => {

  const { user:currentUser } = useCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      const data = await getNotificationsByClient(currentUser?.user_id || '', currentUser?.token);
      setNotifications(data);
    }

    if(currentUser) 
      loadNotifications();

  }, [currentUser]);

  const handleStatusChange = (updatedNotification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.notificationId === updatedNotification.notificationId ? updatedNotification : n
      )
    );
  };

  return (
    <div className='max-w-3xl mx-auto mt-8'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'> Tus Notificaciones</h2>

        <div className="h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-azulOscuro">
              No hay notificaciones disponibles.
            </p>
          ) : (
            [...notifications].reverse().map((notification) => (
              <NotificationItem
                key={notification.notificationId}
                token={currentUser?.token}
                notification={notification}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
    </div>
  );
};

export default NotificationList;
