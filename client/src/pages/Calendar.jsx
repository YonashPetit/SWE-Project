import React from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import styled from 'styled-components';
import "../pages/Dashboard.css";

function Calendars({ setShowNavbar }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useLayoutEffect(() => {
    setShowNavbar(true);
  }, []);

  const fetchEvents = async () => {
    try {
      const userId = secureLocalStorage.getItem("id");
      const response = await fetch("http://localhost:8000/get-events/", { method: "GET" });
      const data = await response.json();

      // Filter based on user or admin privileges
      const filtered = data.events.filter((event) => {
        if(!event.attending){
          return null;
        }
        if (secureLocalStorage.getItem('admin') === true) {
          return event.clubname === secureLocalStorage.getItem('clubname');
        } else {
          return event.attending.includes(userId);
        }
      });
      filtered.sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? -1 : 1);
      setEvents(filtered); // Update the state with the filtered events
      setFilteredEvents(filtered); // Initialize filteredEvents
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateChange = (date) => {
    const datebox = document.getElementById('date');
    const place = document.getElementById('dateplace')
    if (datebox.style.display == 'none'){
      place.style.display = 'none';
      datebox.style.display = 'block';
    }
    setSelectedDate(date);

    // Format the date using moment.js
    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log(`Selected Date: ${formattedDate}`);

    // Filter events matching the selected date
    const filteredByDate = events.filter((event) =>
      moment(event.date).format("YYYY-MM-DD") === formattedDate
    );

    console.log("Filtered Events:", filteredByDate);
    setFilteredEvents(filteredByDate);
  };

  return (
    <>
      <div className="flex-container">
        <div
          className="calendarleft"
          style={{ height: "800px", color: "white", padding: "50px", overflow: "hidden" }}
        >
          <CalendarContainer>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </CalendarContainer>
        </div>
        <div className="right">
          <h2 id = "dateplace">Events</h2>
          <h2 id = "date" style={{display: 'none'}}>Events on {selectedDate.toDateString()}</h2>
          {filteredEvents.length > 0 ? (
            <ul style={{listStyleType: "none"}}>
              {filteredEvents.map((event) => (
                <li key={event._id} style={{fontSize: "18px", listStyleType: "none", margin: '0',
                  padding: '0'}}>
                  <div>
                    <strong>{event.eventname}</strong>
                  </div>
                  <div style={{ fontSize: "0.9em", color: "gray" }}>
                    {moment(event.date).format("MMMM Do YYYY, h:mm A")}
                  </div> 
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
  max-width: 800px;
  margin: auto;
  background-color: #333;
  border-radius: 3px;

  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
  }

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

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }

  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
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
