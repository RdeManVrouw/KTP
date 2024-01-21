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
import Calculator from './loan';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Car = () => {

    const [data, setData] = useState({
        price: '',
        used: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const validate = () => {
        if (!data.price) {
            return false;
        }
        if (!data.used) {
            return false;
        }
        return true;
    };

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "type_loan",
                value: "car loan",
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData2 = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "car_age",
                value: data.used,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData3 = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "price_car",
                value: data.price * 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        if (!validate()) {
            alert("Please fill all the fields");
            return;
        }
        sendData();
        sendData2();
        sendData3();
        setNext(true);
    }

    return (
        <>
            {prev ? <Home></Home> : <>
                {next ? <Calculator></Calculator> : <>
                    <div className='font'><h1>Car Loans</h1></div>
                    <Row className='mt-5'>
                        <Col>
                            <FloatingLabel controlId="floatingTextarea" label="Price" className='font'>
                                <Form.Control onChange={handleChange} type="number" name='price' placeholder="" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="New or Used"
                            >
                                <Form.Select onClick={handleChange} name="used" aria-label="Floating label select example">
                                    <option name="used" value="new">New                                                   </option>
                                    <option name="used" value="old">Used                                                 </option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
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
                </>}
            </>}
        </>
    );
}

export default Car;