import './App.css';

import Home from './components/Home';
import OurRooms from './components/OurRooms';
import Error from './components/Error';
import Navbar from './components/Navbar';

import { Routes, Route } from 'react-router-dom';
import UserReservations from './components/UserReservations';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/roomsandreservation/" element = {<OurRooms />} />
        <Route path="/userreservations/:Email/:Token" element = {<UserReservations />} />
        <Route path="/*" element= {<Error />} />
      </Routes>
    </>
  );
}

export default App;