import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
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

const SearchButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: end;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    align-self: stretch;
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

const BusCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BusOperator = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
`;

const BusDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Detail = styled.div`
  text-align: center;
`;

const DetailLabel = styled.div`
  color: ${props => props.theme.colors.gray};
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
`;

const SelectButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  float: right;
  
  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }
`;

const SearchPage = () => {
  const [searchData, setSearchData] = useState({
    from: 'Warszawa',
    to: 'Kraków',
    date: ''
  });
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/search-buses`, {
        params: searchData
      });
      setBuses(response.data);
    } catch (error) {
      console.error('Ошибка поиска:', error);
    }
    
    setLoading(false);
  };

  const handleSelectBus = (bus) => {
    navigate('/booking', { state: { bus, searchData } });
  };

  return (
    <Container>
      <Title>Поиск автобусных билетов</Title>
      
      <SearchForm onSubmit={handleSearch}>
        <InputGroup>
          <Label>Откуда</Label>
          <Input
            type="text"
            name="from"
            value={searchData.from}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Куда</Label>
          <Input
            type="text"
            name="to"
            value={searchData.to}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label>Дата</Label>
          <Input
            type="date"
            name="date"
            value={searchData.date}
            onChange={handleInputChange}
            required
          />
        </InputGroup>
        
        <SearchButton type="submit" disabled={loading}>
          {loading ? 'Поиск...' : 'Найти'}
        </SearchButton>
      </SearchForm>
      
      {buses.length > 0 && (
        <ResultsContainer>
          {buses.map((bus) => (
            <BusCard key={bus.id}>
              <BusHeader>
                <BusOperator>{bus.operator}</BusOperator>
                <Price>{bus.price} PLN</Price>
              </BusHeader>
              
              <BusDetails>
                <Detail>
                  <DetailLabel>Отправление</DetailLabel>
                  <DetailValue>{bus.departureTime}</DetailValue>
                </Detail>
                <Detail>
                  <DetailLabel>Прибытие</DetailLabel>
                  <DetailValue>{bus.arrivalTime}</DetailValue>
                </Detail>
                <Detail>
                  <DetailLabel>В пути</DetailLabel>
                  <DetailValue>{bus.duration}</DetailValue>
                </Detail>
              </BusDetails>
              
              <Detail style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <DetailLabel>Свободных мест: {bus.availableSeats}</DetailLabel>
              </Detail>
              
              <SelectButton onClick={() => handleSelectBus(bus)}>
                Выбрать
              </SelectButton>
            </BusCard>
          ))}
        </ResultsContainer>
      )}
    </Container>
  );
};

export default SearchPage;