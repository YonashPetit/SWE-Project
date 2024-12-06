import React from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import styled from 'styled-components';
import "../pages/Dashboard.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';



function Calendars({setShowNavbar}) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  // Optional: Logout function that could clear session storage and redirect to login
  useLayoutEffect(() => {
    setShowNavbar(true);
  }, [])
  useEffect(()=>{
    const fetchEvents = async (e) => {
      try {
        const userId = secureLocalStorage.getItem("id");
        const response = await fetch("http://localhost:8000/get-events/", {
            method: "GET",
        });
        const data = await response.json();
        if(secureLocalStorage.getItem('admin') == true){
          for (let i = 0; i < data.events.length; i++) {
            if (data.events[i].clubname == secureLocalStorage.getItem('clubname')){
              console.log(moment(data.events[i].date).format("MMMM Do YYYY, h:mm A"));
            }
            else{
              let removed = data.events.splice(i,1);
            }
          }
        }
        else{
          for (let i = 0; i < data.events.length; i++) {
            if (data.events[i].attending.indexOf(secureLocalStorage.getItem('id')) != -1){
              console.log(moment(data.events[i].date).format("YYYY-MM-DD"));
            }
            else{
              let removed = data.events.splice(i,1);
            }
          }
        }
        setEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [])
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Format the date using moment.js
    const formattedDate = moment(date).format("MMMM Do, YYYY"); // Example: "December 4th, 2024"
    console.log(`Selected Date: ${formattedDate}`);
    // Filter events by the selected date
    const eventsForDate = new Array(events.length);
    for (let i = 0; i < events.length; i++) {
      console.log("loop");
      if (moment(events[i].date).format("YYYY-MM-DD") == moment(date).format("YYYY-MM-DD")){
        eventsForDate[i] = events[i];
      }
      else{
        let removed = events.splice(i,1);
      }
    }
    console.log(eventsForDate);
    setFilteredEvents(eventsForDate);
    console.log(events);
    console.log(filteredEvents);
  };

  return (
    <>
      <div className='flex-container'>
        <div className= "calendarleft" style={{height: "8 00px", color: "white", padding: "50px", overflow: "hidden"}}>
          <CalendarContainer>
          <Calendar 
          onChange={handleDateChange}
          value={selectedDate}
          />
          </CalendarContainer>
        </div>
        <div className='right'>
        <h2>Events on {selectedDate.toDateString()}</h2>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event) => (
              <li key={event._id} style={{ padding: "10px 0", fontSize: "18px" }}>
                {event.eventname}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this day.</p>
        )}
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
  background-color: #333;
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
