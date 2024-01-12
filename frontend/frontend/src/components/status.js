import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Home from './home';
import Button from 'react-bootstrap/Button';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Address from './home_address';


const Status = ({ page }) => {

    const [data, setData] = useState({
        employment: '',
        status: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = {};
        if (!data.employment) {
            errors.employment = 'Employment is required';
        }
        if (!data.status) {
            errors.status = 'Status is required';
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
        if (error.employment || error.status) {
            alert("Please fill all the fields");
            return;
        }
        setPage(page1 + 1);
    }

    return (
        <>

            {page1 === 3 ? <Address page={page1}></Address> : <>

                {page1 === 5 ? <Home page={page1}></Home> :
                    <>
                        <h1 className='font'>Home Address Details</h1><br />
                        <Row className="g-2 mt-2 font">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Gender"
                                >
                                    <Form.Select onClick={handleChange} name="employment" aria-label="Floating label select example">
                                        <option name="employment" value="Employed">Employed</option>
                                        <option name="employment" value="Unemployed">Unemployed</option>
                                        <option name="employment" value="Student">Student</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-2">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Gender"
                                >
                                    <Form.Select onClick={handleChange} name="status" aria-label="Floating label select example">
                                        <option name="status" value="Married">Married</option>
                                        <option name="status" value="Alone">Alone</option>
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

export default Address;
