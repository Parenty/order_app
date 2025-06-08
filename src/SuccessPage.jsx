import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // БАГ: Вместо e-mail отображаем предупреждение, но e-mail не передаём
  return (
    <div>
      <h1>Успешный заказ!</h1>
      <p>Уважаемый, спасибо за заказ на нашем сайте.</p>
      <p>На вашу почту будет отправлено письмо с подробностями о заказе.</p>
      <button onClick={() => { /* ничего не происходит */ }}>Назад</button>
      <div className="error" style={{marginTop:16}}>
        Вместо e-mail отображаем предупреждение, но e-mail не передаём
      </div>
    </div>
  );
} 