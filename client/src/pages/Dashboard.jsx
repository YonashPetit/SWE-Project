import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import moment from "moment";
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";
import secureLocalStorage from 'react-secure-storage';



function Dashboard({setShowNavbar}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const fetchEvents = async (e) => {
    try {
        const userId = secureLocalStorage.getItem("id");
        const response = await fetch("http://localhost:8000/get-events/", {
            method: "GET",
        });
        const data = await response.json();
        if (secureLocalStorage.getItem('admin') == true) {
            for (let i = data.events.length - 1; i >= 0; i--) {
                if (data.events[i].clubname == secureLocalStorage.getItem('clubname')) {
                } else {
                    data.events.splice(i, 1);
                }
            }
        } else {
            for (let i = data.events.length - 1; i >= 0; i--) {
                if (!data.events[i].attending) {
                    data.events.splice(i, 1);
                    continue;
                }
                if (data.events[i].attending.indexOf(secureLocalStorage.getItem('id')) === -1) {
                    data.events.splice(i, 1);
                }
            }
        }

        // Sort events by date using moment.js
        data.events.sort((a, b) => moment(a.date).isBefore(moment(b.date)) ? -1 : 1);
        
        setEvents(data.events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
  };
  const fetchClubs = async (e) => {
    try {
      const response = await fetch("http://localhost:8000/get-clubs/", {
          method: "GET",
      });
      const data = await response.json();
      if(secureLocalStorage.getItem('admin') == true){
        for (let i = data.clubs.length - 1; i >= 0; i--) {
          if (data.clubs[i].clubname == secureLocalStorage.getItem('clubname')) {
            
          } else {
            let removed = data.clubs.splice(i, 1);
          }
        }
      }
      else{
        for (let i = data.clubs.length - 1; i >= 0; i--) {
          if (!data.clubs[i].member){
            let removed = data.clubs.splice(i, 1);
            continue;
          }
          if (data.clubs[i].member.indexOf(secureLocalStorage.getItem('id')) !== -1) {
            
          } else {
            let removed = data.clubs.splice(i, 1);
          }
        }
      }
      setClubs(data.clubs);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  useEffect(() => {
    fetchEvents();
    fetchClubs();
  }, []);
  const handleUnRSVP = async (eventId) => {
    try {
      const userId = secureLocalStorage.getItem("id");
      const response = await fetch("http://localhost:8000/unrsvp-event/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, event_id: eventId }),
      });

      if (response.ok) {
        // Remove the event from the local state
        window.location.reload();
      } else {
        console.error("Failed to un-RSVP");
      }
    } catch (error) {
      console.error("Error during un-RSVP:", error);
    }
  };

  const handleRemoveClub = async (clubId) => {
    try {
      const userId = secureLocalStorage.getItem("id");
      const response = await fetch("http://localhost:8000/remove-club/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, club_id: clubId }),
      });

      if (response.ok) {
        // Remove the club from the local state
        window.location.reload();
      } else {
        console.error("Failed to remove club");
      }
    } catch (error) {
      console.error("Error during remove club:", error);
    }
  };
  const onChange = (date) => {
    setValue(date);
  }
  useLayoutEffect(() => {
    setShowNavbar(true);
  }, [])
  if(secureLocalStorage.getItem('admin') == true){
    return (
      <>
      <div className='flex-container'>
        <div className='sides' style={{ overflowY: 'auto' }}> 
            <p id = "Events">Your Events</p>
            {events.map((item) => (
              <li
                style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0', lineHeight: '2' }}
                key={item._id}
              >
                <div>
                  <strong>{item.eventname}</strong>
                </div>
                <div style={{ fontSize: "0.9em", color: "gray" }}>
                  {moment(item.date).format("MMMM Do YYYY, h:mm A")}
                </div> {/* Adjusted to display the event name */}
                <div style={{ fontSize: "0.9em", color: "gray" }}>
                  {"Attending:  " + item.attending.length}
                </div>
              </li>
            ))}
        </div>
        <div className='middle'>
            <CalendarContainer>
              <Calendar/>
            </CalendarContainer>
        </div>
        <div className='sides'>
            <p id = "Clubs">Your Club</p>
            {clubs.map((item) => (
              <li
                style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0' }}
                key={item._id}
              >
                {item.clubname} {/* Adjusted to display the event name */}
              </li>
            ))}
        </div>
      </div>
      </>
    );
  }
  else{
    return (
      <>
      <div className='flex-container'>
        <div className='sides' style={{ overflowY: 'auto' }}> 
            <p id = "Events">Your Events</p>
            {events.map((item) => (
              <li
                style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0'}}
                key={item._id}
              >
                <div>
                  <strong>{item.eventname}</strong>
                </div>
                <div style={{ fontSize: "0.9em", color: "gray" }}>
                  {moment(item.date).format("MMMM Do YYYY, h:mm A")}
                </div> {/* Adjusted to display the event name */}
                <button className = "unrsvp-button"
                  onClick={() => handleUnRSVP(item._id)}
                >
                  Un-RSVP
                </button>
              </li>
            ))}
        </div>
        <div className='middle'>
            <CalendarContainer>
              <Calendar/>
            </CalendarContainer>
        </div>
        <div className='sides'>
            <p id = "Clubs">Your Clubs</p>
            {clubs.map((item) => (
              <li
                style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0' }}
                key={item._id}
              >
                {item.clubname} {/* Adjusted to display the event name */}
                <button className="remove-club-button"
                  onClick={() => handleRemoveClub(item._id)}
                >
                  Remove Club
                </button>
              </li>
            ))}
        </div>
      </div>
      </>
    );
  }
}

export default Dashboard;
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
