import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Axios from 'axios';
import moment from 'moment';
import RoomType from './RoomType';

export default function Rooms () {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rooms, setRooms] = useState([]);
    
    const searchRooms = e => {  
        console.log(checkIn);
        console.log(checkOut);
        let hasErrors = false;
        if (checkIn === '' || checkOut === '' ) {
            alert("Enter the check and checkout dates")
            hasErrors = true;
        }
        else if (checkOut < checkIn) {
            alert("Checkout date should be after the check In date")
            hasErrors = true;
        }
        if (hasErrors) {
            return;
        }
        
        const getRoomsUri = `https://ymma83ympk.execute-api.us-east-1.amazonaws.com/prod/hotel/rooms?checkIn=${checkIn}&checkOut=${checkOut}`;
        Axios.get(getRoomsUri)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    setRooms(response.data.data)
                }
            })
            .catch((error) => {
                console.log('Error in getting available rooms');
            });

    }

    useEffect(() => {
        let min = moment().format('YYYY-MM-DD');
        let max = moment().add(1, "year").format('YYYY-MM-DD');

        document.getElementById("checkOut").setAttribute("min", min);
        document.getElementById("checkOut").setAttribute("max", max);
        document.getElementById("checkIn").setAttribute("min", min);
        document.getElementById("checkIn").setAttribute("max", max);
               
    }, []);

    return (
        <div> 
            <Container>
                <h2>B & B Hotel</h2>     
                <hr/>           
                <Row>
                    <Col md={1}>Check In</Col>
                    <Col md={3}>
                        <input type="date"
                                name="checkIn"  
                                id="checkIn"
                                onChange={(event) => setCheckIn(event.target.value)}
                        />
                    </Col>
                    <Col md={2} align="right">Check Out</Col>
                    <Col md={2}>
                        <input type="date"
                                onChange={(event) => setCheckOut(event.target.value)}
                                name="checkOut"  
                                id="checkOut" 
                        />
                    </Col>
                    <Col md={1}>
                        <Button variant="primary"
                                onClick={searchRooms}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <h4>Available Rooms</h4>
                    {rooms.map(room =>
                        <Col xs={12} md={12} key={room.id} style={{ margin: '0.5rem 0rem' }}>
                            <RoomType 
                                room={room}
                            
                                // onActionSuccess={fetchFundrasiers}
                            />
                        </Col>
                    )}
                </Row>

            </Container>
        </div>
    );
}