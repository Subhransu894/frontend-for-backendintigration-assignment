import useFetch from "../useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar=({searchItem,setSearchItem})=>{
    const {data,error,loading}=useFetch("https://backend-intigration-assignment.vercel.app/events")
    const[events,setEvents]=useState([]);
    // console.log(events);
    if(data && events.length === 0){
        setEvents(data)
    }

    return(
        <>
            <section>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid">
                        <Link 
                        to="/"
                        className="navbar-brand" 
                        style={{fontFamily:"cursive",color:"red",fontSize: "1.8rem", textDecoration: "none" }}
                        >Meetup</Link>
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
                            placeholder="Search by title or tags"
                            aria-label="Search"
                            value={searchItem}
                            onChange={(e)=>setSearchItem(e.target.value)}
                            style={{
                                paddingLeft:"35px",
                            }}/>
                        </form>     
                    </div>
                </nav>
                <hr/>
            </section>
        </>
    )
}
export default Navbar;