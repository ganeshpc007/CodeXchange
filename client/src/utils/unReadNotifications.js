export const unReadNotificationsFunc = (notification) => {
  return notification?.filter((n) => !n.isRead);
};
