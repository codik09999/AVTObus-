import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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

const TripSummary = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
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

const BookButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: 1 / -1;
  margin-top: 1rem;
  
  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${props => props.theme.colors.gray};
    cursor: not-allowed;
    transform: none;
  }
`;

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, searchData } = location.state || {};
  
  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    phone: '',
    documentNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPassengerData({
      ...passengerData,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        busId: bus.id,
        passengerData: {
          ...passengerData,
          ...searchData,
          price: bus.price
        }
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/create-order`, bookingData);
      
      if (response.data.orderId) {
        navigate('/payment', { 
          state: { 
            orderId: response.data.orderId,
            bus,
            passengerData: bookingData.passengerData
          }
        });
      }
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      alert('Ошибка при создании заказа. Попробуйте снова.');
    }

    setLoading(false);
  };

  if (!bus) {
    return (
      <Container>
        <Title>Ошибка: данные о поездке не найдены</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Бронирование билета</Title>
      
      <TripSummary>
        <SummaryTitle>Детали поездки</SummaryTitle>
        <p><strong>Маршрут:</strong> {searchData.from} → {searchData.to}</p>
        <p><strong>Дата:</strong> {searchData.date}</p>
        <p><strong>Время отправления:</strong> {bus.departureTime}</p>
        <p><strong>Время прибытия:</strong> {bus.arrivalTime}</p>
        <p><strong>Перевозчик:</strong> {bus.operator}</p>
        <p><strong>Стоимость:</strong> {bus.price} PLN</p>
      </TripSummary>
      
      <Form onSubmit={handleBooking}>
        <InputGroup>
          <Label>Имя и фамилия</Label>
          <Input
            type="text"
            name="name"
            value={passengerData.name}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={passengerData.email}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Телефон</Label>
          <Input
            type="tel"
            name="phone"
            value={passengerData.phone}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Номер документа</Label>
          <Input
            type="text"
            name="documentNumber"
            value={passengerData.documentNumber}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <BookButton type="submit" disabled={loading}>
          {loading ? 'Создание заказа...' : 'Перейти к оплате'}
        </BookButton>
      </Form>
    </Container>
  );
};

export default BookingPage;