import React, { Component } from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import Services from "./Services";

export default class Home extends Component{
  render() {
  return (
      <>  
      <Hero>
        <Banner title="Luxurious rooms" subtitle="Deluxe rooms starting at 299.99$." >
          <Link to="/roomsandreservation" className="btn-primary">
            Our Rooms
          </Link>
        </Banner>
      </Hero>
      <Services></Services>
      </>
    );
  }
}
  