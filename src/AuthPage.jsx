import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const loginEnv = process.env.REACT_APP_LOGIN;
  const passwordEnv = process.env.REACT_APP_PASSWORD;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === loginEnv && password === passwordEnv) {
      sessionStorage.setItem('authorized', 'true');
      navigate('/');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '60px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2>Авторизация</h2>
      <div className="form-row">
        <label>Логин</label>
        <input value={login} onChange={e => setLogin(e.target.value)} autoFocus />
      </div>
      <div className="form-row">
        <label>Пароль</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" style={{ width: '100%' }}>Войти</button>
    </form>
  );
} 