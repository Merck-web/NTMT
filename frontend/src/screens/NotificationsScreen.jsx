import React from "react";
import RowNotification from "../components/RowNotification/RowNotification";

function NotificationsScreen({ math }) {
  let rows = [];
  for (var i = 0; i < 5; i++) {
    rows.push(<RowNotification key={i} />);
  }
  return (
    <div>
      <div className='title'>Уведомления</div>
      <div className='all_notification'>
        <div className='center-content'>
          <div className='all_view'>Показать: <span>Все</span></div>
          {rows}
        </div>
        <div className='all_btn'>
          <button className='notific-btn'>Показать больше</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationsScreen;
