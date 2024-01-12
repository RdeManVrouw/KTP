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


const Pinfo = ({ page }) => {

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
        let errors = {};
        if (!data.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!data.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!data.age) {
            errors.age = 'Age is required';
        }
        if (!data.id) {
            errors.id = 'ID is required';
        }

        return errors;
    };

    // useEffect(() => {
    //     fetch("http://localhost:3000/")
    //         .then((res) => res.json())
    //         .then((data) => setMessage(data.message));
    // }, []);

    const [page1, setPage] = useState(page);

    useEffect(() => {
        // console.log("pinfo:" + page1);
    }
    );

    const handleBack = () => {
        setPage(page1 - 1);
    }

    const handleNext = () => {
        let error = validate(data);
        console.log("error:" + error);
        if (error.firstName === undefined && error.lastName === undefined && error.age === undefined && error.id === undefined) {
            setPage(page1 + 1);
            return;
        }
        alert("Please fill all the fields");
    }

    return (
        <>

            {page1 === 1 ? <Start page={page1}></Start> : <>

                {page1 === 3 ? <Address page={page1}></Address> :
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
                                <Button className="contact-btn rounded-pill font" onClick={handleBack} size="sm">
                                    Back
                                </Button>
                            </Col>
                            <Col>
                                <Button className="contact-btn rounded-pill font" onClick={handleNext} size="sm">
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
