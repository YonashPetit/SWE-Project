import { React, useState } from 'react'

import data from "./ClubList.json"



function ClubList(props) {
    const filteredData = data.filter((el) => {

        if (props.input === '') {
            return el;
        }
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    const preview = (item) => {
        const previewname = document.getElementById("ClubName");
        const previewdesc = document.getElementById("ClubDesc");
        previewname.innerHTML = item.text;
        previewdesc.innerHTML = item.description;
    }

    return (
        <ul style={{ maxHeight: '635px', overflowY: 'auto'}}>
            {filteredData.map((item) => (
                <li onClick={() => preview(item)} style = {{cursor: "pointer", listStyle: "none", margin: "0", padding: "0"}} key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}
export default ClubList


