import { React, useState } from 'react'

import data from "./EventList.json"



function EventList(props) {
    const filteredData = data.filter((el) => {

        if (props.input === '') {
            return el;
        }
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    const preview = (item) => {
        const previewname = document.getElementById("EventName");
        const previewdate = document.getElementById("EventDate&Time");
        const previewhost = document.getElementById("EventHost");
        const previewdesc = document.getElementById("EventDesc");
        previewname.innerHTML = item.text;
        previewdesc.innerHTML = item.description;
        console.log(item.datetime);
        console.log(item.host);
        previewdate.innerHTML = item.datetime;
        previewhost.innerHTML = item.host;

    }

    return (
        <ul style={{ maxHeight: '635px', overflowY: 'auto'}}>
            {filteredData.map((item) => (
                <li onClick={() => preview(item)} style = {{cursor: "pointer", listStyle: "none", margin: "0", padding: "0"}} key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}
export default EventList


