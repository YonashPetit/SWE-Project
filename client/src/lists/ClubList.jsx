import React, { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

function ClubList(props) {
  const [clubs, setClubs] = useState([]);

  // Fetch events from the FastAPI backend when the component is mounted
  useEffect(() => {
    const fetchClubs = async (e) => {
      try {
        const response = await fetch("http://localhost:8000/get-clubs/", {
            method: "GET",
        });
        const data = await response.json();
        setClubs(data.clubs); // Update the state with the events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchClubs();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Filter events based on the input prop
  const filteredData = clubs.filter((el) => {
    if (props.input === '') {
      return el;
    } else {
      return el.clubname.toLowerCase().includes(props.input.toLowerCase()); // Adjust filter logic
    }
  });

  // Function to preview event details
  const preview = (item) => {
    const previewname = document.getElementById("ClubName");
    const previewdesc = document.getElementById("ClubDesc");
    const button = document.getElementById("button");

    previewname.innerHTML = item.clubname; // Adjusted to match the backend field
    previewdesc.innerHTML = item.description;
    button.style.display = "block";
    secureLocalStorage.setItem("curclub", item._id)
  };

  return (
    <ul style={{ maxHeight: '635px', overflowY: 'auto' }}>
      {filteredData.map((item) => (
        <li
          onClick={() => preview(item)}
          style={{ cursor: 'pointer', listStyle: 'none', margin: '0', padding: '0' }}
          key={item._id}
        >
          {item.clubname} {/* Adjusted to display the event name */}
        </li>
      ))}
    </ul>
  );
}

export default ClubList;
