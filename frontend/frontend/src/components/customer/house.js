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
import House2 from './house2';

const House = () => {

    const [data, setData] = useState({
        price: '',
        buy: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const validate = () => {
        if (!data.price) {
            return false;
        }
        if (!data.buy) {
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
                name: "price",
                value: data.price * 1,
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
                name: "buy",
                value: data.buy,
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
                name: "type_loan",
                value: "house loan",
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
        if (validate() === false) {
            alert("Please fill in all the fields");
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
                {next ? <House2></House2> : <>
                    <div className='font'><h1>Housing</h1></div>
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
                                label="Buy or Renovate"
                            >
                                <Form.Select onClick={handleChange} name="buy" aria-label="Floating label select example">
                                    <option name="buy" value="yes">Buy                                                   </option>
                                    <option name="buy" value="no">Renovate                                                 </option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="g-2 mt-3">
                            <Col md>
                                <Form.Group controlId="formFile" className="mb-3 font">
                                    <Form.Label className='font'>Proof of House</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
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

export default House;