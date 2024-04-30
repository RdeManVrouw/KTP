import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Salary from './salary';
import Button from 'react-bootstrap/Button';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Address from './home_address';

// email verification regex 
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


const Status = () => {

    const [data, setData] = useState({
        email: '',
        employment: '',
        status: '',
    });

    const [error, setError] = useState({
        error: false,
        email_error: false,
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        error.error = false;
        error.email_error = false;
        if (!data.email) {
            error.error = true;
        }
        if (data.email !== '' && !emailRegex.test(data.email)) {
            error.email_error = true;
        }
        if (!data.employment) {
            error.error = true;
        }
        if (!data.status) {
            error.error = true;
        }
    };

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "employment",
                value: data.employment,
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
            if(error.email_error === true){
                //show an example
                alert("Please enter a valid email address\nExample: " + emailRegex);
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

            {prev ? <Address></Address> : <>

                {next ? <Salary></Salary> :
                    <>
                        <Row className="g-2 mt-2 font">
                            <Col md>
                                <FloatingLabel className="font" controlId="floatingInputGrid" label="Email">
                                    <Form.Control className="font" onChange={handleChange} type="email" name='email' placeholder="champ" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Employement"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="employment" aria-label="Floating label select example">
                                        <option name="employment" value="Employed">Employed</option>
                                        <option name="employment" value="Unemployed">Unemployed</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Status"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="status" aria-label="Floating label select example">
                                        <option name="status" value="Married">Married</option>
                                        <option name="status" value="Alone">Unmarried</option>
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

export default Status;
