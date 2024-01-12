import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Home from './home';
import Button from 'react-bootstrap/Button';

const House = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        setNext(true);
    }

    return (
        <>
            {prev ? <Home></Home> : <>
                <div className='font'><h1>Housing</h1></div>
                <Row className='mb-4' />
                <Row>
                    <Col>
                        <Button className="contact-btn rounded-pill font" onClick={handleBack} size="md">
                            Back
                        </Button>
                    </Col>
                    <Col>
                        <Button className="contact-btn rounded-pill font" onClick={handleNext} size="md">
                            Next
                        </Button>
                    </Col>
                </Row>
            </>
            }
        </>
    );
}

export default House;