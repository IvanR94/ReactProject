import React , { useState, useEffect } from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Room from "./Room";

export default function OurRooms() {
    const [roomsData, setRoomsData] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(true);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    const handleTokenChange = (newToken) => {
      setToken(newToken);
    };
  
    const handleEmailChange = (newEmail) => {
      setEmail(newEmail);
    };

    useEffect(() => {
      fetch('http://localhost:5203/api/roomsandreservation/GetAllRooms')
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
          console.log("Our rooms data: " + data)
          setRoomsData(data); // Update state with fetched data
        })
        .catch(error => {
          setError(error.message);
        });
    }, []); // Empty dependency array to run this effect only once (on mount)

    if (error) {
      console.log(error.message)
    }
    
    console.log({load})

    return (
      <>
      <Hero hero="roomsHero">
        <Banner title="Our rooms">
          <Link to="/" className="btn-primary">
            Return home
          </Link>
        </Banner>
      </Hero>
      <section>
        <div className="user-resevation">
          <div className="section-div-user-res">
            <h6>E-mail:</h6>
            <input
              className="email"
              type="text"
              placeholder="E-mail"
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          <div className="section-div-user-res">
          <h6>Token:</h6>
            <input
              className="token"
              type="text"
              onChange={(e) => handleTokenChange(e.target.value)}
            />
          </div>
          <div className="section-div-user-res">
            {
              (email && token) ? (
                <Link to={`/userreservations/${email}/${token}`} className="btn-search-res">
                  Search your reservation
                </Link>
              ) : null
            }
          </div>
        </div>
      </section>
      <section className="roomslist">
        <div className="roomslist-center">
          {load ? <Loading /> : null}
          {roomsData.map(roomObj => (
            <Room key={roomObj.roomID} room={roomObj} />
          ))}
        </div>
      </section>
      </>
    );
  }
