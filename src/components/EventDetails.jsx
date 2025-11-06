import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
const EventDetails = ()=>{
    const {eId} = useParams();
    const{data:eve,error,loading}=useFetch(`https://backend-intigration-assignment.vercel.app/events/${eId}`);
    console.log(eve);

    if (loading) return <p className="text-center mt-5">Loading event details...</p>;
    if (error) return <p className="text-center mt-5">Error loading event: {error.message}</p>;
    if (!eve) return <p className="text-center mt-5">No event found.</p>;
    return(
        <>
            <section className="conatiner-fluid px-4 px-md-5 mb-3">  
                <Navbar/> 
                <div className="row">
                    <div className="col-md-8 my-3 ">
                        <h5 style={{fontWeight:"bold"}}>{eve.title}</h5>
                        <p>Hosted by:<strong>{eve.hostedby}</strong></p>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <img src={eve.thumbnail} alt={eve.title} className="img-fluid rounded mb-3 " style={{ width: "70%", maxHeight: "400px", objectFit: "cover" }} />
                        </div>
                        
                        <h5 style={{fontWeight:"bold"}}>Details:</h5>
                        <div style={{maxWidth: "70%", wordBreak: "break-word", overflowWrap: "break-word" }}>
                            <p>{eve.description  || "No Description is Available"}</p>
                        </div>
                        

                        <h5 style={{fontWeight:"bold"}}>Additional Information</h5>
                        <p><strong>Dress Code:</strong>{eve.dresscode}</p>
                        <p><strong>Age restriction:</strong>{eve.ageRestriction}</p>
                        {eve.tags && eve.tags.length > 0 && (
                            <div>
                                <h6 style={{fontWeight:"bold"}}>Event Tags:</h6>
                                {eve.tags.map((tag,idx)=>(
                                    <button key={idx} className="btn btn-danger btn-sm me-2 mb-2">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="col-md-4 my-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="bi bi-clock-fill me-2 text-decoration-none "></i>
                                    <span className="text-wrap"
                                        style={{
                                            fontSize: "0.9rem",
                                            whiteSpace: "nowrap",
                                            overflow: "visible",
                                            display: "inline-block"
                                            }}
                                    >
                                        {(()=>{
                                            const eventDate = new Date(eve.date);
                                            const startTime = new Date(eve.createdAt);
                                            const endTime = new Date(startTime);
                                            endTime.setHours(startTime.getHours()+2)

                                            const dateStr = eventDate.toLocaleDateString("en-IN",{
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                timeZone: "Asia/Kolkata"
                                            }).replace(/,/g,"")
                                                const formatTime = (date) => {
                                                let hours = date.getHours();
                                                const ampm = hours >= 12 ? "PM" : "AM";
                                                hours = hours % 12 || 12; // convert 24hr → 12hr
                                                return `${hours.toString().padStart(2, "0")}:00:00 ${ampm}`;
                                                };

                                                const start = formatTime(startTime);
                                                const end = formatTime(endTime);

                                                return `${dateStr}, ${start} - ${end} IST`;
                                            })()}
                                    </span>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <i className="bi bi-geo-alt-fill me-2 "></i>
                                    <span style={{fontSize:"0.9rem"}}>{eve.address}</span>
                                </div>
                                <div className="d-flex align-items-start mb-3">
                                    <i className="bi bi-currency-rupee me-2"></i> 
                                    <span style={{fontSize:"0.9rem"}}>{eve.price ? `${eve.price}` : "Free"}</span>  
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 ">
                            {eve.speakers && eve.speakers.length > 0 && (
                                <>
                                    <h6 className="fw-bold mb-3">Speakers: ({eve.speakers.length})</h6>   
                                    <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-4">                       
                                    {eve.speakers.map((spr,idx)=>(
                                        <div key={idx} className="card p-2 text-center" 
                                            style={{ width: "140px", borderRadius: "12px" }}
                                        >
                                            <img src={spr.image} alt={spr.name} 
                                            className="rounded-circle mx-auto mb-2"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}/>
                                            <p className="mb-1 text-center" style={{ fontSize: "0.85rem" }}><strong>{spr.name}</strong></p>
                                            <p className="text-center" style={{ fontSize: "0.75rem" }}>{spr.desgination}</p>
                                        </div>
                                    ))}
                                    </div> 
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EventDetails;