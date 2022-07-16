import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";

export default function BookingDetailsCard (props) {

    const booking = props.booking;
    // const pastBooking = props.pastBooking;
    
    return (
        <Card md={6}>
            <Card.Header>
                <strong>{booking.roomType}</strong>    
            </Card.Header>
            <Card.Body>
                <Row>        
                    <Col md={8}>
                        <Row>
                            <Col md={2}>Booking Number</Col>
                            <Col md={10}>{booking.bookingNumber}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Amount Paid</Col>
                            <Col md={10}>{booking.amountPaid}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Booking Date</Col>
                            <Col md={10}>{booking.bookingDate}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Check In</Col>
                            <Col md={10}>{booking.checkIn}</Col>
                        </Row>
                        <Row>
                            <Col md={2}>Check Out</Col>
                            <Col md={10}>{booking.checkOut}</Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>{booking.status}</Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    );

}