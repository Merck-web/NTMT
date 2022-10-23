import React, {useState, useEffect} from "react";
import api from '../api'

function Login({ setToken }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('1');

  async function logIn() {
    if (!login.trim() || !password.trim()) {
      alert('Введите корректный логин и пароль!');
    } else {
      try {
        const request = {
          login: login,
          password: password,
          type: role,
        };
        const data = await api.post('/auth/login', request);
        setToken(data);
      } catch (error) {
        console.error(error);
        console.error('ERROR LOG IN');
      }
    }
  }

  return (
    <div className="loginPage">
      <div className="login-wrapper">
        <div className="login-wrapper__title">
          Войти в учетную запись УрФУ
        </div>
        <div className="form">
          <input
              value={login}
              className="input-name"
              placeholder="Введите ваш логин"
              type="text"
              onChange={e => setLogin(e.target.value)}
          />
          <input
              value={password}
              className="input-pass"
              placeholder="Введите ваш пароль"
              type="password"
              onChange={e => setPassword(e.target.value)}
          />
          <div className="filter">
            <select
                value={role}
                className="select"
                onChange={e => setRole(e.target.value)}
            >
              <option value="1">Студент/Преподаватель</option>
              <option value="2">Родитель</option>
            </select>
          </div>
          <button className="btn-form" onClick={() => logIn()}>Войти</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
