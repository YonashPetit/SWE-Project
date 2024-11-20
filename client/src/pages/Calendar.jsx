import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";



function Calendars() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  // Optional: Logout function that could clear session storage and redirect to login
  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/login');
  };
  const onChange = (date) => {
    setValue(date);
  }

  return (
    <>
    <div className='flex-container'>
      <div className='middle'>
          <CalendarContainer>
            <Calendar/>
          </CalendarContainer>
      </div>
      <div className='middle'>
          Hi
      </div>
    </div>
    </>
  );
}

export default Calendars;
const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
  background-color: #333;
  padding: 10px;
  border-radius: 3px;

  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }

  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #363;
    border: 0;
    border-radius: 3px;
    color: white;
    padding: 5px 0;

    &:hover {
      background-color: #343;
    }

    &:active {
      background-color: #373;
    }
  }

  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 
    
    .react-calendar__tile {
      max-width: initial !important;
    }

    .react-calendar__tile--range {
      box-shadow: 0 0 6px 2px white;
    }
  }

  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }

  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months, .react-calendar__decade-view__years, .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }
    
    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;
