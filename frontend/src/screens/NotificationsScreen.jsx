import React, { useState } from "react";
import RowNotification from "../components/RowNotification/RowNotification";

function NotificationsScreen({ math }) {
  const [notifications, setNotifications] = useState(5);
  let rows = [];
  for (var i = 0; i < notifications; i++) {
    rows.push(<RowNotification key={i} />);
  }
  return (
    <div>
      <div className="title">Уведомления</div>
      <div className="all_notification">
        <div className="center-content">
          <div className="all_view">
            Показать: <span>Все</span>
          </div>
          {rows}
        </div>
        <div className="all_btn">
          <button
            onClick={() => setNotifications(notifications + 5)}
            className="notific-btn"
          >
            Показать больше
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsScreen;
