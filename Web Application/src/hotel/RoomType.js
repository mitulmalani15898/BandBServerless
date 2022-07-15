import { Card, Row, Col, Button } from "react-bootstrap";

export default function RoomType (props) {

    const room = props.room;
    const amenityCategory = Object.keys(room.amenities);
    const bookNowHandler = props.onBookNow;

    return (
        <Card>
            <Card.Header><strong>{room.roomType}</strong></Card.Header>
            <Card.Body>
                <Row>
                    <Col md={10}>
                        <Row>
                            <Col md={4}>Number of Beds</Col>
                            <Col md={8}>{room.numberOfBeds}</Col>
                        </Row>
                        <Row>
                            <Col md={4}>Room area</Col>
                            <Col md={8}>{room.roomArea}</Col>
                        </Row>
                        <Row>
                            <Col md={4}>Amenities</Col>
                            <Col md={8}>
                                <Row>
                                    {amenityCategory
                                        .map(key =>                                                           
                                            <Col md={4} key={key}>
                                                <strong>{key}</strong>
                                                {room.amenities[key].map(a => 
                                                    <ul key={a}>{a}</ul>)
                                                }
                                            </Col>                                                                        
                                    )}
                                </Row>  
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <span style={{color:'green'}}>
                            {room.currency} {room.price}
                        </span>
                        <br/>
                        <Button variant="primary"
                                // onClick={bookRoom}
                            >
                            Book Now
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

}

