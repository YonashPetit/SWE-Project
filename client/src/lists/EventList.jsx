import React, { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import moment from 'moment';
function EventList(props) {
  const [events, setEvents] = useState([]);

  // Fetch events from the FastAPI backend when the component is mounted
  useEffect(() => {
    const fetchEvents = async (e) => {
      try {
        const response = await fetch("http://localhost:8000/get-events/", {
            method: "GET",
        });
        const data = await response.json();
        setEvents(data.events); // Update the state with the events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Filter events based on the input prop
  const filteredData = events.filter((el) => {
    if (props.input === '') {
      return el;
    } else {
      return el.eventname.toLowerCase().includes(props.input.toLowerCase()); // Adjust filter logic
    }
  });

  // Function to preview event details
  const preview = (item) => {
    const previewname = document.getElementById("EventName");
    const previewdate = document.getElementById("EventDate&Time");
    const previewhost = document.getElementById("EventHost");
    const previewloc = document.getElementById("EventLoc");
    const previewdesc = document.getElementById("EventDesc");
    const button = document.getElementById("button");
    

    previewname.innerHTML = item.eventname; // Adjusted to match the backend field
    previewdesc.innerHTML = item.description; // No change, already matching
    previewdate.innerHTML = moment(item.date).format("MMMM Do YYYY, h:mm A"); // Adjusted to match the backend field
    previewhost.innerHTML = item.clubname; // Adjusted to match the backend field
    previewloc.innerHTML = item.location;
    button.style.display = "block";
    secureLocalStorage.setItem("curevent", item._id)

  };

  return (
    <ul style={{ maxHeight: '635px', overflowY: 'auto' }}>
      {filteredData.map((item) => (
        <li
          onClick={() => preview(item)}
          style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0' }}
          key={item._id}
        >
          {item.eventname} {/* Adjusted to display the event name */}
        </li>
      ))}
    </ul>
  );
}

export default EventList;
