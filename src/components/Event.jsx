import useFetch from "../useFetch";
import { useState } from "react";
import {Link} from "react-router-dom"
const Event = () =>{
    const {data,error,loading}=useFetch("https://backend-intigration-assignment.vercel.app/events")
    const[events,setEvents]=useState([]);
    const[searchItem,setSearchItem]=useState("")
    const[selectType,setSelectType]=useState("Select Event Type")

    const searchEvent = events.filter((eve)=>eve.title.toLowerCase().includes(searchItem.toLowerCase()));

    const filterEventType = events.filter((eve)=> {
        if(selectType === "Select Event Type" || selectType === "Both"){
            return true;
        }
        return eve.type === selectType;
    })
    // console.log(data);

    if(data && events.length === 0){
        setEvents(data)
    }
    return(
        <>
            <section>
                <nav className="navbar bg-body-tertiary px-4">
                    <div className="container-fluid">
                        <span className="navbar-brand" style={{fontFamily:"cursive",color:"red",fontSize: "1.8rem"}}>Meetup</span>
                        <form className="d-flex align-items-center position-relative" role="search">
                             <i
                            className="bi bi-search position-absolute"
                            style={{
                            left: '10px',
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: '#6c757d',
                            pointerEvents: "none"
                            }}
                            ></i>
                            <input className="form-control me-2" 
                            type="search" 
                            placeholder="Search by title"
                            aria-label="Search"
                            value={searchItem}
                            onChange={(e)=>setSearchItem(e.target.value)}
                            style={{
                                paddingLeft:"35px",
                            }}/>
                        </form>     
                    </div>
                </nav>
                <hr />  
            </section>
            
            <section className="px-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>MeetUp Events</h2>
                    <select name="" id="" 
                    className="form-select w-auto" 
                    value={selectType} 
                    onChange={(e)=>setSelectType(e.target.value)}
                    >
                        <option value="Select Event Type">Select Event Type</option>
                        <option value="Both">Both Events</option>
                        <option value="Online">Online Event</option>
                        <option value="Offline">Offline Event</option>
                    </select>
                </div>
                <div className="row mt-3">
                    {filterEventType.length > 0 ? (filterEventType.map((event)=>(
                        <div className="col-md-4 mb-4" key={event._id}>
                            <Link to={`/events/${event._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="card position-relative">
                                <span className="btn btn-sm btn-light text-black badge position-absolute top-0 start-0 m-2">
                                    {event.type}
                                </span>
                                <img src={event.thumbnail} alt={event.title} className="card-img-top"/>
                            </div>
                            <div className="card-body">
                                <p className="card-title">
                                    {new Date(event.date).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    }).replace(/,/g, "")}{" "}
                                    •{" "}
                                    {(()=>{
                                        const d = new Date(event.createdAt)
                                        let hrs = d.getHours()
                                        const ampm = hrs >= 12 ? "PM" :"AM"
                                        hrs=hrs%12 || 12
                                        return `${hrs.toString().padStart(2,"0")}:00:00 ${ampm} IST`
                                    })()}
                                </p>
                                <h5 className="card-title">{event.title}</h5>
                            </div>
                            </Link>
                        </div>
                    ))) : ( <p>No events found.</p> )}
                </div>
            </section>
        </>
    )
}
export default Event;