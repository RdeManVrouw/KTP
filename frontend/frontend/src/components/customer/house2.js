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
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import House3 from './house3';
import House from './house';
import StartBanker from '../banker/startbanker';

const House2 = () => {

    const [data, setData] = useState({
        guarantor: '',
        name: '',
    });

    const [flag, setFlag] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const validate = () => {
        if (!data.guarantor) {
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
                value: "house loan",
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
                name: "guarantor",
                value: data.guarantor,
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
        sendData2();
        if (data.guarantor === 'yes') {
            setFlag(true);
            return;
        }
        setNext(true);
    }

    return (
        <>
            {prev ? <House></House> : <>
                {flag ? <House3></House3> : <>
                    {next ? <StartBanker></StartBanker> : <>
                        <div className='font'><h1>Housing</h1></div>
                        <Row className='mt-5'>
                            <Col>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Do you have a guarantor?"
                                >
                                    <Form.Select onClick={handleChange} name="guarantor" aria-label="Floating label select example">
                                        <option name="guarantor" value="yes">Yes                                                   </option>
                                        <option name="guarantor" value="no">No                                                 </option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <Form.Group controlId="formFile" className="mb-3 font">
                                    <Form.Label className='font'>Proof of Identity</Form.Label>
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
            </>}
        </>
    );
}

export default House2;