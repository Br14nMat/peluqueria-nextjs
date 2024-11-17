import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}/notifications`;

export interface Notification {
  notificationId: string;
  clientId: string;
  type: string;
  message: string;
  status: 'unread' | 'read';
  timestamp: Date;
}

export interface CreateNotificationDTO {
  clientId: string;
  type: string;
  message: string;
  status: 'unread' | 'read';
  timestamp: Date;
}

export async function createNotification(
  notification: CreateNotificationDTO,
  token?: string
): Promise<Notification> {
  const response = await axios.post<Notification>(BASE_URL, notification, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
}

export async function getNotificationsByClient(
  clientId: string,
  token?: string
): Promise<Notification[]> {
  const response = await axios.get<Notification[]>(`${BASE_URL}/${clientId}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
}

export async function markNotificationAsRead(
  notificationId: string,
  token?: string
): Promise<Notification> {
  const response = await axios.patch<Notification>(
    `${BASE_URL}/${notificationId}/read`,
    {},
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }
  );
  return response.data;
}

export async function deleteAllNotificationsByClient(
  clientId: string,
  token?: string
): Promise<void> {
  await axios.delete(`${BASE_URL}/${clientId}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
