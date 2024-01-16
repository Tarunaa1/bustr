import React from 'react'
import '../App.css'

export default function Bus(props) {
  return (
    <>
    <div className='box'>
      <div className='heading'>{props.name}</div>
      <div className='details'><b>{props.deptime}</b> &#x2022;&#x2022;&#x2022;&#x2022;&#x2022;<b>{props.arrtime}</b><br></br>
      {props.date} &#x2022; {props.tottime} &#x2022; 1 stop 
       </div>
       <div className='price'>From<br></br> <b>{props.price} + Gst</b> for 1 <br></br>Onwards</div>
       <button className='select'>Select Seats</button>
    </div>

    </>
  )
}