// Author: Akanksha Singh (B00892887)
import { useState, useEffect } from "react";
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import BookingDetailsCard from "./BookingDetailsCard";

export default function UserRoomBookings () {

    const [pastBookings, setPastBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);

    useEffect(() => {
        // Get this from local storage
        const userId = "asingh1001";
        const getBookingsUri = ` https://ymma83ympk.execute-api.us-east-1.amazonaws.com/prod/hotel/bookings?userId=${userId}`;
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
            <hr/>
            <Tabs defaultActiveKey="ongoing" fill>                
                <Tab eventKey="ongoing" title="Upcoming/Ongoing">
                    {
                        upcomingBookings.length === 0 ? <span>No upcoming bookings</span>
                        : upcomingBookings.map(booking => <BookingDetailsCard booking={booking} />)                                                
                    }
                </Tab>
                <Tab eventKey="past" title="Past">
                    {
                        pastBookings.length === 0 ? <span>No past bookings</span> 
                        : pastBookings.map(booking => <BookingDetailsCard booking={booking} />)
                    }                    
                </Tab>
            </Tabs>            
        </Container>

    );

}