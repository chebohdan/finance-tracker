import { useState } from "react";
import {
  useNotificationBell,
  type NotificationMessage,
} from "../../hooks/useNotificationBell";

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useNotificationBell("http://localhost:8080/ws", (notification) =>
    setNotifications((prev) => [notification, ...prev])
  );

  return (
    <div className="relative inline-block">
      {/* Bell button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 text-2xl text-[var(--color-dark-text)] hover:text-[var(--color-accent)] transition-colors"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white rounded-full bg-[var(--color-danger)]">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-60 overflow-y-auto bg-[var(--color-dark-surface)] border border-[var(--color-dark-bg)] rounded shadow-lg z-50">
          {notifications.length === 0 ? (
            <div className="p-4 text-[var(--color-dark-text)] text-center">
              No notifications
            </div>
          ) : (
            notifications.map((notif, index) => (
              <div
                key={index}
                className="px-4 py-2 border-b border-[var(--color-dark-bg)] cursor-pointer text-[var(--color-dark-text)] hover:bg-[var(--color-dark-bg)]"
              >
                <div>{notif.message}</div>
                <div className="text-xs text-[var(--color-accent)]">
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
