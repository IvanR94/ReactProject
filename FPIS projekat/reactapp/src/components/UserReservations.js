import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Hero from "./Hero";
import Banner from "./Banner";
import Loading from "./Loading";
import ReservationDetails from "./ReservationDetails";

export default function UserReservations() {

    const { Email, Token } = useParams();
    console.log(Email, Token);

    const [roomsData, setRoomsData] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const [showMessage, setShowMessage] = useState('');
    

    useEffect(() => {
    fetch(`http://localhost:5203/api/userreservations/GetReservationRooms`
                , {
                    method: 'GET',
                    headers:{
                        'Email': Email,
                        'Token': Token
                    }
                })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }
        else{
            setLoad(false);
            return response.json();
        }
        })
        .then(data => {
        console.log("Your reservation rooms: " + data)
        setRoomsData(data); // Update state with fetched data
        })
        .catch(error => {
        setError(error.message);
        });
    }, [Email, Token]);
    
    if (error) {
        console.log(error.message)
    }

    function handleCancelReservation() {
        fetch(`http://localhost:5203/api/userreservations/CancelReservation`
                , {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body:JSON.stringify({ Email: Email, Token: Token })
                })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }
        else{
            setLoad(false);
            return response.json();
        }
        })
        .then(data => {
        console.log("Your reservation rooms: " + data)
        setShowMessage(data); // Update state with fetched data
        })
        .catch(error => {
        setError(error.message);
        });
    }

    return (
        <>
        <Hero hero="roomsHero">
        <Banner title="Your reservations">
            <Link to="/roomsandreservation/" className="btn-primary">
                Return to rooms
            </Link>
        </Banner>
        </Hero>
        <section>
        <div className="user-resevation">
            <div className="section-div-user-res">
                <h6>E-mail: {Email}</h6>
                {roomsData.length !== 0 && 
                    (<button className="btn-primary" onClick={() => handleCancelReservation()}>Cancel reservation</button>)
                }
            </div>
            {showMessage !== '' && (
                            <div className="modal-message-div">
                                <p>{showMessage}</p>
                            </div>
                            )
            }
        </div>
        </section>
        <section className="roomslist">
        <div className="roomslist-center">
            {load ? (<Loading />) 
            : (roomsData.length === 0 ? (<p>You don't have any reservations.</p>)
                    :    
                    (roomsData.map(roomObj => (
                    <ReservationDetails key={roomObj.reservationDetailsID} room={roomObj} />
                    )))
            ) 
            }
        </div>
        </section>
        </>
    )
}