import useFetch from "../useFetch";
import { useState } from "react";
import {Link} from "react-router-dom"
import Navbar from "./Navbar";
const Event = () =>{
    const {data,error,loading}=useFetch("https://backend-intigration-assignment.vercel.app/events")
    const[events,setEvents]=useState([]);
    
    const[selectType,setSelectType]=useState("Select Event Type")
    const[searchItem,setSearchItem]=useState("")
    
    if(data && events.length === 0){
        setEvents(data)
    }

     if (loading) return <p className="text-center mt-5">Loading event details...</p>;
     if (error) return <p className="text-center mt-5">Error loading event: {error.message}</p>;
     if (!events) return <p className="text-center mt-5">No event found.</p>;

    const filterByType =
    selectType === "Select Event Type"
      ? events
      : selectType === "Both"
      ? events
      : events.filter((eve) => eve.type === selectType);

      const filteredEvents = filterByType.filter((eve) =>{
           const titleMatch= eve.title.toLowerCase().includes(searchItem.toLowerCase())
           let tagMatch =false
           if(Array.isArray(eve.tags)){
                const foundTag = eve.tags.find((tag)=>
                    tag.toLowerCase().includes(searchItem.toLowerCase())
                );
               if(foundTag){
                tagMatch=true;
               } 
           } 
           return titleMatch || tagMatch
        });
    // console.log(data);

    return(
        <>  
            <section className="conatiner-fluid px-4 px-md-5">
                <Navbar searchItem={searchItem} setSearchItem={setSearchItem} />
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
                    {filteredEvents.length > 0 ? (filteredEvents.map((event)=>(
                        <div className="col-md-4 mb-4" key={event._id}>
                            <Link to={`/events/${event._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="card position-relative  mx-auto" style={{ maxWidth: "500px" }}>
                                <span className="btn btn-sm btn-light text-black badge position-absolute top-0 start-0 m-2">
                                    {event.type}
                                </span>
                                <div className="text-center">
                                    <img src={event.thumbnail} alt={event.title} className="card-img-top img-fluid rounded"/>
                                </div>    
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