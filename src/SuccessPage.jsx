import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, email } = location.state || {};
  return (
    <div>
      <h1>Успешный заказ!</h1>
      <p>Уважаемый {username || '%name%'}, спасибо за заказ на нашем сайте.</p>
      <p>На вашу почту {email || 'example@example.com'} будет отправлено письмо с подробностями о заказе.</p>
      <button onClick={() => {}}>Назад</button>
    </div>
  );
} 