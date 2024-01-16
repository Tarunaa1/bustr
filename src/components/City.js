import React , {useEffect, useState} from "react";
import '../App.css'
import Bus from "./Bus";
const moment = require("moment")

export default function City() {
    const API_URL = "https://bus-data.onrender.com/";
 
  const [apidata,setApidata] = useState([{}])
  useEffect(()=>{
    fetch(API_URL+"cities").then(
      response=> response.json()
    ).then(
      data =>{
        setApidata(data)
      }
    )
  },[])
  const [busdata,setbusdata] = useState([{}])
  useEffect(()=>{
    fetch(API_URL+"busdata").then(
      response=> response.json()
    ).then(
      data =>{
        setbusdata(data)
      }
    )
  },[])

  const [source, setSource] = useState("")
  const [dest , setDest ] = useState("")
  let [date, setDate] = useState("")
  const [searchResult, setSearchResult] = useState(null);
  const day =moment(date).format('dddd')


  const onClickfunc = () => {
    if (source && dest && busdata.busses) {
      const selectedBusses = busdata.busses.filter(
        (bus) => bus.source === source && bus.destination === dest
      );
      if (selectedBusses.length >0) {
        date = moment(date).format('MMM D')
        const list = selectedBusses.flatMap((bus)=>(
          bus[day].bus.map((e)=>(
        <Bus name={e.name} deptime={e.deptime} arrtime={e.arrtime}
            tottime={e.traveltime} price={e.price} date={date}/>)))
        )
        setSearchResult(list)
        
      } else {
        setSearchResult("No bus found for the selected route.");
      }
    }else{
      setSearchResult("Select required fields!!")
    }
  };

  return (
    <>
      
       <div className="holder">
        
          <select className="departure" onChange={(e)=>{setSource(e.target.value)

          }}>
          <option disabled selected hidden>Enter Source</option>
          {(typeof apidata.cities === 'undefined')?(
                <p>loadingg</p>
              ):(
                
                apidata.cities.map((name, ind) => {
                  return <option >{name}</option>;
                })
              )}
            
          </select>
          
        <div className="holder">
            <select className="destination" onChange={(e)=>{setDest(e.target.value)}}>
            <option disabled selected hidden>Enter Destination</option>
              {(typeof apidata.cities === 'undefined')?(
                <p>loadingg</p>
              ):(
                
                apidata.cities.map((name, ind) => {
                  return <option >{name}</option>;
                })
              )}
            </select>
        </div>
        <div className="holder">
            <input type="date" className="date" onChange={(e)=>{setDate(e.target.value)}}></input>
        </div>
        <button className="search" onClick={onClickfunc}>
          Search bus
        </button>
        <div>{searchResult}</div>
      </div> 
    </>
  );
}






















/* <button onClick={()=>{
            const mid = source;
            setSource(dest)
            setDest(mid)
          }}>swp</button> */
