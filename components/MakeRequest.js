import React, { useState } from 'react';

let token = "eyJhbGciOiJFUzI1NiIsIng1dCI6IkRFNDc0QUQ1Q0NGRUFFRTlDRThCRDQ3ODlFRTZDOTEyRjVCM0UzOTQifQ.eyJvYWEiOiI3Nzc3NSIsImlzcyI6Im9hIiwiYWlkIjoiMTA5IiwidWlkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiY2lkIjoiLWgtSERJWmxDSzZUZno3VXlPcEVNQT09IiwiaXNhIjoiRmFsc2UiLCJ0aWQiOiIyMDAyIiwic2lkIjoiZjBjNDRlNWUxYzlhNDJkYWJhZmExMmU4YmY4ODEzNGUiLCJkZ2kiOiI4NCIsImV4cCI6IjE2NDg5MDc5MDUiLCJvYWwiOiIxRiIsImlpZCI6ImFhOWM0Zjg0MGJiZDRhZTA0NDBhMDhkOWFiM2I5ZDFlIn0.kdMUhUEI4VbxQqHO0jVtPQWlcBwlINJlAgoHGGW3DonnBDUCZ8g0u3P_3I9pX43-Akna9Fzn27ueBZEe57xVwQ";

export default function MakeRequest(props) {

  function ClickClick() {
    fetch(props.url, {
      'method': props.method,
      'headers': { 'Authorization': 'Bearer ' + token}
    }).then(r => {
      if (r.status==200) {
        return r.json()
      } else {
        return "Failed.."
      }
    }).then(r => {
      console.log(r);
    })
  }

  return (
    <div style={{
    "borderRadius": "10px", 
    "background": "#f7f7f7",
    "padding": "10px"
    }}>
      <br/>
      <button onClick={ClickClick}>Try request</button>
      <br/>
      <p id="x">Result:</p>
      <br/>
    </div>
    )
}