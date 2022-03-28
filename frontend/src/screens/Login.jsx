import React from "react";

function Login() {
  return (
    <div className="loginPage">
      <div className="login-wrapper">
        <div className="login-wrapper__title">Войти в учетную запись УрФУ</div>
        <form className="form">
          <input
            className="input-name"
            placeholder="Введите ваш логин"
            type="text"
          />
          <input
            className="input-pass"
            placeholder="Введите ваш пароль"
            type="password"
          />
          <div className="filter">
            <select className="select">
              <option value="2">Студент/Преподаватель</option>
              <option value="1">Родитель</option>
            </select>
          </div>
          <button className="btn-form">Войти</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
