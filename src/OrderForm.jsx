import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const PRODUCTS = [
  { label: 'Процессор', value: 'cpu', img: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png' },
  { label: 'Видеокарта', value: 'gpu', img: 'https://cdn-icons-png.flaticon.com/512/1048/1048954.png' },
  { label: 'Блок питания', value: 'psu', img: 'https://cdn-icons-png.flaticon.com/512/1048/1048955.png' },
];

const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1); // БАГ: только 1-10, а не 1-100

const TODAY = new Date();
const getDateString = (date) => date.toISOString().split('T')[0];

export default function OrderForm() {
  const [product, setProduct] = useState('cpu');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(getDateString(TODAY));
  const [need, setNeed] = useState('yes');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // БАГ: картинка не обновляется при смене товара
  const productImg = PRODUCTS[0].img;

  const validate = () => {
    const errs = {};
    if (!name || name.length < 2 || name.length > 50) {
      errs.name = 'Имя должно быть от 2 до 50 символов';
    }
    if (!email) {
      errs.email = 'E-mail обязателен';
    }
    if (!agree) {
      errs.agree = 'Необходимо согласие';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    // Отправка письма через emailjs (mock)
    try {
      await emailjs.send(
        'service_xxx',
        'template_xxx',
        {
          name,
          email,
          product: PRODUCTS.find(p => p.value === product).label,
          quantity,
          date,
          need,
        },
        'user_xxx'
      );
    } catch (e) {}
    setSubmitting(false);
    navigate('/success', { state: { name, email } });
  };

  // БАГ: кнопка "Очистить форму" сбрасывает только товар и имя, e-mail не сбрасывается
  const handleReset = () => {
    setProduct('cpu');
    setName('');
    // setEmail(''); // баг: не сбрасываем email
    setQuantity(1);
    setDate(getDateString(TODAY));
    setNeed('yes');
    setAgree(false);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Заказ</h1>
      <div className="form-row">
        <label>Товар</label>
        <select value={product} onChange={e => setProduct(e.target.value)}>
          {PRODUCTS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Количество</label>
        <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
          {QUANTITIES.map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
        <div className="error">Фактическое поле ограничено числом от 1 до 10</div>
      </div>
      <div className="form-row">
        <label>Имя</label>
        <input value={name} onChange={e => setName(e.target.value)} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className="form-row">
        <label>E-mail</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-row">
        <label>Дата самовывоза заказа</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Нужна для установки?</label>
        <div className="checkbox-row">
          <label><input type="radio" checked={need === 'yes'} onChange={() => setNeed('yes')} /> Да</label>
          <label><input type="radio" checked={need === 'no'} onChange={() => setNeed('no')} /> Нет</label>
        </div>
      </div>
      <div className="form-row">
        <img src={productImg} alt="product" style={{ width: 64, height: 64 }} />
        <div className="error">Картинка - всегда блок "Блок питания"</div>
      </div>
      <div className="form-row">
        <label>
          <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /> Согласен на обработку перс. данных
        </label>
        {errors.agree && <div className="error">{errors.agree}</div>}
      </div>
      <div className="form-row" style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={submitting}>Заказать</button>
        <button type="button" onClick={handleReset}>Очистить форму</button>
      </div>
    </form>
  );
} 