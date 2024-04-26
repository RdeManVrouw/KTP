import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Start from './start';
import Button from 'react-bootstrap/Button';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import House2 from './house2';
import StartBanker from '../banker/startbanker';


const Pinfo = () => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        id: '',
        salary: '',
        expenses: '',
    });

    const [error, setError] = useState({
        error: false,
        age_error: false,
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        error.error = false;
        error.age_error = false;
        if (!data.firstName) {
            error.error = true;
        }
        if (!data.lastName) {
            error.error = true;
        }
        if (!data.age) {
            error.error = true;
        }
        if (!data.id) {
            error.error = true;
        }
        if (!data.salary) {
            error.error = true;
        }
        if (!data.expenses) {
            error.error = true;
        }
        if (data.age < 18 || data.age > 65) {
            error.age_error = true;
        }
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
                name: "age_guarantor",
                value: data.age * 1,
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
                name: "guarantor_salary",
                value: data.salary * 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData4 = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "guarantor_expenses",
                value: data.expenses * 1,
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
        validate(data);
        if (error.error === false) {
            if (error.age_error === true) {
                alert("You must be between 18 and 65 years old");
                return;
            }
            sendData();
            sendData2();
            sendData3();
            sendData4();
            setNext(true);
            return;
        }
        alert("Please fill all the fields");
    }

    return (
        <>

            {prev ? <House2></House2> : <>
                {next ? <StartBanker></StartBanker> :
                    <>
                        <h1 className='font'>Personal Information of Guarantor</h1><br />
                        <Row className="g-2 mt-2">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="First Name">
                                    <Form.Control onChange={handleChange} type="name" name='firstName' placeholder="champ" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Last Name">
                                    <Form.Control onChange={handleChange} type="name" name='lastName' placeholder="pan" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Age">
                                    <Form.Control onChange={handleChange} type="number" name='age' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="ID">
                                    <Form.Control onChange={handleChange} type="id" name="id" placeholder="18+" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Salary or Income">
                                    <Form.Control onChange={handleChange} type="number" name='salary' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Expenses (Including Rent)">
                                    <Form.Control onChange={handleChange} type="number" name="expenses" placeholder="" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <Form.Group controlId="formFile" className="mb-3 font">
                                    <Form.Label className='font'>Proof of Expenses</Form.Label>
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
                    </>
                }
            </>}


        </>
    );
}

export default Pinfo;
