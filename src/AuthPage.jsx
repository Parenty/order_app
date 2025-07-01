import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Функция для получения datestamp в формате YYYYMMDD
function getDateStamp() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

// Простая функция хэширования (для примера)
function simpleHash(str) {
  let hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash.toString();
}

export default function AuthPage() {
  const tempvar = getDateStamp();
  const loginhash = simpleHash(process.env.REACT_APP_LOGIN + tempvar);
  const passwordhash = simpleHash(process.env.REACT_APP_PASSWORD + tempvar);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputLoginHash = simpleHash(login + tempvar);
    const inputPasswordHash = simpleHash(password + tempvar);
    if (inputLoginHash === loginhash && inputPasswordHash === passwordhash) {
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