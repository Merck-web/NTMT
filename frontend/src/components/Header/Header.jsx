import React from "react";
import "./Header.css";

function Headers() {
  return (
    <header>
      <div className='header'>
        <div className='logo'>
          <img
            className='logo-img'
            src='images/logo.png'
            alt='images/logo.png'
          />
        </div>
        <div className='user'>
          <div className='user-profile'>
            <img
              className='user-icon'
              src='images/userProfile.svg'
              alt='images/userProfile.svg'
            />
            <p className='bio'>
              <span className='user-fio'>Иванов Иван Иванович </span>
              <span className='user-group'>/ T-393901-НТ</span>
            </p>
          </div>
          <div className='logout'>
            <img
              className='logout-icon'
              src='images/logout.svg'
              alt='images/logout.svg'
            />
            <p className='btn-logout'>Выход</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Headers;
