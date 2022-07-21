// Author: Akanksha Singh (B00892887)
import { useState, useEffect } from "react";
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import BookingDetailsCard from "./BookingDetailsCard";
import * as HotelMgmtConstants from './HotelMgmtConstants';
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

export default function UserRoomBookings () {

    const [pastBookings, setPastBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const { currentUser } = useContext(AuthContext);
    console.log("Current user is " + currentUser)

    useEffect(() => {
        // Get this from local storage
        const userId = "Akanksha_Singh_2022-07-20T21:58:12.553Z";
        const getBookingsUri = HotelMgmtConstants.apiBaseUrl + `/hotel/bookings?userId=${userId}`;
        Axios.get(getBookingsUri)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    processBookings(response.data.bookings);
                }
            })
            .catch((error) => {
                console.log('Error in fetching the room bookings');
            });               
    }, []);

    const processBookings = (bookings) => {
        const now = new Date();
        let pastBookings = [];
        let upcomingBookings = [];
        bookings.map(booking => {
            if (booking.checkOut < now) {
                pastBookings.push(booking);
            }
            else{
                upcomingBookings.push(booking);
            }
        })
        setPastBookings(pastBookings);
        setUpcomingBookings(upcomingBookings);
        console.log("Total past bookings " + pastBookings.length);
        console.log("Total upcoming bookings " + upcomingBookings.length);
    }

    return(
        <Container md={9}>
            <h2>All Bookings</h2>
            <span>*<i>Standard Check-in time is 10 AM and Checkout is 12 PM</i></span>
            <hr/>
            <Tabs defaultActiveKey="ongoing" fill>                
                <Tab eventKey="ongoing" title="Upcoming/Ongoing">
                    {
                        upcomingBookings.length === 0 ? <span>No upcoming bookings</span>
                        : upcomingBookings.map(booking => 
                        <BookingDetailsCard booking={booking} type="upcoming" key={booking.bookingNumber} />)                                                
                    }
                </Tab>
                <Tab eventKey="past" title="Past">
                    {
                        pastBookings.length === 0 ? <span>No past bookings</span> 
                        : pastBookings.map(booking => 
                        <BookingDetailsCard booking={booking} type="past" />)
                    }                    
                </Tab>
            </Tabs>            
        </Container>

    );

}