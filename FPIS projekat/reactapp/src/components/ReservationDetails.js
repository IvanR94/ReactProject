import React from "react";
import img1 from "../images/room-1.jpeg";
import img2 from "../images/room-2.jpeg";
import img3 from "../images/room-3.jpeg";
import img4 from "../images/room-4.jpeg";
import img5 from "../images/room-5.jpeg";
import img6 from "../images/room-6.jpeg";
import img7 from "../images/room-7.jpeg";
import img8 from "../images/room-8.jpeg";
import img9 from "../images/room-9.jpeg";
import img10 from "../images/room-10.jpeg";
import img11 from "../images/room-11.jpeg";
import img12 from "../images/room-12.jpeg";

export default function ReservationDetails({ room }) {
    let imageUrl;
    switch (room.roomID) {
        case 1:
            imageUrl = img1;
          break;
        case 2:
            imageUrl = img2;
            break;
        case 3:
            imageUrl = img3;
          break;
        case 4:
            imageUrl = img4;
            break;
        case 5:
            imageUrl = img5;
            break;
        case 6:
            imageUrl = img6;
            break;
        case 7:
            imageUrl = img7;
            break;
        case 8:
            imageUrl = img8;
            break;
        case 9:
            imageUrl = img9;
            break;
        case 10:
            imageUrl = img10;
            break;
        case 11:
            imageUrl = img11;
            break;
        case 12:
            imageUrl = img12;
            break;
        default:
            imageUrl = null; 
    }
    console.log("Image url after case: " + imageUrl);
    return (
        <article className="room">
            <div className="img-container">
                <img src={imageUrl} alt={"single room"} />
            </div>
            <p className="room-info">{room.roomName}</p>
            <p className="room-description">From: {new Date(room.dateFrom).toLocaleDateString('en-US')}</p>
            <p className="room-description">To: {new Date(room.dateTo).toLocaleDateString('en-US')}</p>
            <p className="room-capacity">Price: {room.price}$</p>
        </article>
    )
}