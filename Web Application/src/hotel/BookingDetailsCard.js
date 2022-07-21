import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import moment from 'moment';
import Axios from 'axios';
import * as HotelMgmtConstants from './HotelMgmtConstants';
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function BookingDetailsCard (props) {

    const booking = props.booking;
    const type = props.type;
    const feedbackUrl = `/user/bookings/feedback/${booking.bookingNumber}`;
    const navigate = useNavigate();

    const convertDate = (timeInMilli, format) => {
        var convertedDate = "";
        if (timeInMilli !== '') {
            var date = new Date(timeInMilli);
            convertedDate = moment(date).format(format);
        }
        return convertedDate;
    }

    const cancelBooking = () => {
        console.log("Cancel booking")
        const userId = "Akanksha_Singh_2022-07-20T21:58:12.553Z";        
        const cancelBookingUrl = HotelMgmtConstants.apiBaseUrl + "/hotel/bookings";
        const feedback = {
            userId: userId,
            bookingNumber: booking.bookingNumber
        }
        console.log(feedback);

        Axios
        .put(cancelBookingUrl, feedback)
        .then((response) => {
            if (response.status === 200) {
                alert("Your booking has been cancelled successfully")        
                navigate("/rooms")       
            }
        })
        .catch((error) => alert("Error in cancelling booking"));
    }
    
    return (
        <Card md={6}>
            <Card.Header>
                <strong>{booking.roomType}</strong>    
            </Card.Header>
            <Card.Body>
                <Row>        
                    <Col md={8}>
                        <Row>
                            <Col md={3}>Booking Number</Col>
                            <Col md={9}>{booking.bookingNumber}</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Amount Paid</Col>
                            <Col md={9}>CAD {booking.amountPaid}</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Booking Date</Col>
                            <Col md={9}>{convertDate(booking.bookingDate, "MMMM D, YYYY HH:mm:ss")}</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Check In</Col>
                            <Col md={9}>{convertDate(booking.checkIn, "MMMM D, YYYY")}</Col>
                        </Row>
                        <Row>
                            <Col md={3}>Check Out</Col>
                            <Col md={9}>{convertDate(booking.checkOut, "MMMM D, YYYY")}</Col>
                        </Row>
                    </Col>
                    <Col>
                    {
                        type === 'upcoming' &&
                            <Row>
                                <Col>      
                                    <span>
                                        <strong>{booking.status}</strong>
                                        <br/><br/>
                                    </span>                     
                                    
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Actions
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">View Invoice</Dropdown.Item>
                                            {
                                                (booking.status === 'VALID') && 
                                                <Dropdown.Item onClick={cancelBooking}>Cancel Booking</Dropdown.Item>
                                            }                                                                                     
                                        </Dropdown.Menu>
                                    </Dropdown>                                                        
                                </Col>
                            </Row>
                    }
                    {
                        type === 'past' &&
                        <Row>
                            <Col>                            
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Actions
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href={feedbackUrl}>
                                            Submit Feedback
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">View Invoice</Dropdown.Item>                                        
                                    </Dropdown.Menu>
                                </Dropdown>                                                        
                            </Col>
                        </Row>
                    }                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );

}