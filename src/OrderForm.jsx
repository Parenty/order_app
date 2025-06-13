import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const PRODUCTS = [
  { label: 'Процессор', value: 'cpu', img: 'CPU.png' },
  { label: 'Видеокарта', value: 'gpu', img: 'GPU.png' },
  { label: 'ОЗУ', value: 'ram', img: 'RAM.png' },
  { label: 'Блок питания', value: 'psu', img: null },
];

const TODAY = new Date();
const getDateString = (date) => date.toISOString().split('T')[0];

export default function OrderForm() {
  const [product, setProduct] = useState('cpu');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(getDateString(TODAY));
  const [needYes, setNeedYes] = useState(false);
  const [needNo, setNeedNo] = useState(false);
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Картинка и alt
  let productImg = PRODUCTS.find(p => p.value === product)?.img;
  let productAlt = '';
  if (product === 'psu') productAlt = 'не удалось загрузить изображение';
  else if (product === 'cpu') productAlt = 'CPU';
  else if (product === 'gpu') productAlt = 'GPU';
  else if (product === 'ram') productAlt = 'RAM';

  const validate = () => {
    const errs = {};
    if (!name || name.length < 2 || name.length > 50 || !/^[- а-яА-ЯёЁ']+$/.test(name)) {
      errs.name = 'Имя должно быть от 2 до 50 символов, только кириллица, пробелы, дефисы, апострофы';
    }
    if (!email || !/^.+@.+\..+$/.test(email)) {
      errs.email = 'Введите корректный e-mail';
    }
    if (!quantity || isNaN(quantity) || quantity < 1 || quantity > 99) {
      errs.quantity = 'Значение должно быть меньше или равно 10.';
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
          need: needYes && needNo ? 'да и нет' : needYes ? 'да' : needNo ? 'нет' : '',
        },
        'user_xxx'
      );
    } catch (e) {}
    setSubmitting(false);
    navigate('/success', { state: { name, email } });
  };

  const handleReset = () => {
    setProduct('cpu');
    setName('');
    setQuantity('');
    setDate(getDateString(TODAY));
    setNeedYes(false);
    setNeedNo(false);
    setAgree(true);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Заказ</h1>
      <div className="form-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>Товар</label>
          <select value={product} onChange={e => setProduct(e.target.value)}>
            {PRODUCTS.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label>Количество</label>
          <input
            type="number"
            min={1}
            max={99}
            placeholder="1-10шт"
            value={quantity}
            onChange={e => setQuantity(e.target.value.replace(/[^0-9]/g, ''))}
            style={{ width: '100%' }}
          />
          {errors.quantity && <div className="error">{errors.quantity}</div>}
        </div>
        <div style={{ marginLeft: 16, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {product === 'psu' ? (
            <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', color: '#888', fontSize: 12, textAlign: 'center' }}>{productAlt}</div>
          ) : (
            <img src={productImg ? productImg : undefined} alt={productAlt} style={{ width: 64, height: 64 }} />
          )}
        </div>
      </div>
      <div className="form-row">
        <label>Имя покупателя</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onMouseOver={e => {
            e.target.setAttribute('title', "Длина от 2-50 символов; Только кириллица; Разрешены пробелы, дефисы, апострофы");
          }}
          onFocus={e => {
            e.target.setAttribute('title', "Длина от 2-50 символов; Только кириллица; Разрешены пробелы, дефисы, апострофы");
          }}
        />
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
        <label>Нужна доп. установка?</label>
        <div className="checkbox-row">
          <label><input type="radio" checked={needYes} onChange={e => setNeedYes(e.target.checked)} /> Да</label>
          <label><input type="radio" checked={needNo} onChange={e => setNeedNo(e.target.checked)} /> Нет</label>
        </div>
      </div>
      <div className="form-row">
        <a href="/notfound.pdf" style={{ textDecoration: 'underline', color: '#2563eb', cursor: 'pointer' }} target="_blank" rel="noopener noreferrer">
          Согласен на обработку перс. данных
        </a>
        {errors.agree && <div className="error">{errors.agree}</div>}
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginLeft: 8 }} />
      </div>
      <div className="form-row" style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={submitting}>Заказать</button>
        <button type="button" onClick={handleReset}>Очистить форму</button>
      </div>
    </form>
  );
} 