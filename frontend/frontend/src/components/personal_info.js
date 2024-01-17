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

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.firstName) {
            errors = true;
        }
        if (!data.lastName) {
            errors = true;
        }
        if (!data.age) {
            errors = true;
        }
        if (data.gender === '') {
            errors = true;
        }
        if (!data.id) {
            errors = true;
        }

        return errors;
    };

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                age: data.age,
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
        let error = validate(data);
        if (error === false) {
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
                                <FloatingLabel controlId="floatingInputGrid" label="ID">
                                    <Form.Control onChange={handleChange} type="id" name='id' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Age">
                                    <Form.Control onChange={handleChange} type="age" name="age" placeholder="18+" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Gender"
                                >
                                    <Form.Select onClick={handleChange} name="gender" aria-label="Floating label select example">
                                        <option name="gender" value="Male">Male</option>
                                        <option name="gender" value="Female">Female</option>
                                        <option name="gender" value="Other">Other</option>
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
                    </>
                }
            </>}


        </>
    );
}

export default Pinfo;
