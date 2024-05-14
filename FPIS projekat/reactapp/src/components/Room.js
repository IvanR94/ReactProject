import React ,{ useState }from "react";
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

export default function Room({ room }) {
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

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [showMessage, setShowMessage] = useState('');

    const handleButtonClick = (roomID, pricePerNight) => {
        setFormData({ ...formData, SelectedRoomId: roomID, PricePerNight: pricePerNight});
        setShowModal(true);
      };

    const handleCancel = () => {
        setShowModal(false);
        setFormData({});
        setShowMessage('');
    }

    const handleSubmit = () => {
    console.log('TESTTTT---roomID: ' + room.roomID + ',GuestNumber: ' + room + ' ' + formData.GuestNumber)
    if(1 > formData.GuestNumber || formData.GuestNumber > room.capacity){
        setShowMessage('Dalje neces moci! Broj gostiju premasuje ogranicenja sobe!');
    }
    else{
        console.log("Form data:", formData);
        fetch(`http://localhost:5203/api/roomsandreservation/MakeReservation`
                    , {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body:JSON.stringify(formData)
                      }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok!');
                            }
                            return response.json();
                        })
                        .then(data => {
                            setShowMessage(data); 
                        })
                        .catch(error => {
                            setShowMessage(error.message);
                        });
                    setFormData({});
        };
    }
    return (
        <article className="room">
            <div className="img-container">
                <img src={imageUrl} alt={"single room"} />
                <div className="price-top">
                    <h6>{room.pricePerNight}$</h6>
                    <p>per night</p>
                </div>
                <button onClick={() => handleButtonClick(room.roomID, room.pricePerNight)} className="room-link">
                    Make reservation
                </button>
            </div>
            <p className="room-info">{room.roomName}</p>
            <p className="room-description">Description: {room.description}</p>
            <p className="room-capacity">Capacity: {room.capacity}</p>
            {showModal && (
                <div className="modal">
                    <div className="modal-item-container">
                        <div className="modal-items">
                            <p>Ime: </p>
                            <input
                            type="text"
                            placeholder="ime"
                            onChange={(e) =>
                                setFormData({ ...formData, FirstName: e.target.value })
                            }
                            />
                        </div>
                        <div className="modal-items">
                            <p>Prezime: </p>
                            <input
                            type="text"
                            placeholder="prezime"
                            onChange={(e) =>
                                setFormData({ ...formData, LastName: e.target.value })
                            }
                            />
                        </div>
                        <div className="modal-items">
                            <p>Datum od: </p>
                            <input
                            type="text"
                            placeholder="datum od"
                            onChange={(e) =>
                                setFormData({ ...formData, DateFrom: e.target.value })
                            }
                            />
                        </div>
                        <div className="modal-items">
                            <p>Datum do: </p>
                            <input
                            type="text"
                            placeholder="datum do"
                            onChange={(e) =>
                                setFormData({ ...formData, DateTo: e.target.value })
                            }
                            />
                        </div>
                        <div className="modal-items">
                            <p>E-mail: </p>
                            <input
                            type="text"
                            placeholder="email"
                            onChange={(e) =>
                                setFormData({ ...formData, Email: e.target.value })
                            }
                            />
                        </div>
                        <div className="modal-items">
                            <p>Broj gostiju: </p>
                            <input
                            type="text"
                            placeholder="broj gostiju"
                            onChange={(e) =>
                                setFormData({ ...formData, GuestNumber: e.target.value })
                            }
                            />
                        </div>
                        <div className="modal-items">
                            <p>Kod za popust: </p>
                            <input
                            type="text"
                            placeholder="kod za popust"
                            onChange={(e) =>
                                setFormData({ ...formData, DiscountCode: e.target.value })
                            }
                            />
                        </div>
                    </div>
                    <div className="btn-modal-container">
                        <button className="btn-modal" onClick={handleSubmit}>Submit</button>

                        <button className="btn-modal" onClick={handleCancel}>Close</button>
                    </div>
                    {showMessage !== '' && (
                        <div className="modal-message-div">
                            <p>{showMessage}</p>
                        </div>
                        )
                    }
                </div>
            )}
        </article>
    )
}