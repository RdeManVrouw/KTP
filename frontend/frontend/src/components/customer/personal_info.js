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
import Address from './home_address';


const Pinfo = () => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        id: '',
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
        if (!data.gender) {
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
                name: "age",
                value: data.age * 1,
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
            setNext(true);
            return;
        }
        alert("Please fill all the fields");
    }

    return (
        <>

            {prev ? <Start></Start> : <>

                {next ? <Address></Address> :
                    <>
                        <h1 className='font'>Personal Information</h1><br />
                        <Row className="g-2 mt-2">
                            <Col md>
                                <FloatingLabel className="font" controlId="floatingInputGrid" label="First Name">
                                    <Form.Control className="font" onChange={handleChange} type="name" name='firstName' placeholder="champ" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Last Name">
                                    <Form.Control className="font" onChange={handleChange} type="name" name='lastName' placeholder="pan" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="ID">
                                    <Form.Control className="font" onChange={handleChange} type="id" name='id' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Age">
                                    <Form.Control className="font" onChange={handleChange} type="age" name="age" placeholder="18+" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Gender"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="gender" aria-label="Floating label select example">
                                        <option name="gender" value="Male">Male</option>
                                        <option name="gender" value="Female">Female</option>
                                        <option name="gender" value="Other">Other</option>
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
                    </>
                }
            </>}


        </>
    );
}

export default Pinfo;
