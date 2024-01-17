import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Pinfo from './personal_info';
import Status from './status';


const Address = () => {

    const [data, setData] = useState({
        address: '',
        zip: '',
        town: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const validate = (data) => {
        let errors = false;
        if (!data.address) {
            errors = true;
        }
        if (!data.zip) {
            errors = true;
        }
        if (!data.town) {
            errors = true;
        }

        return errors;
    };

    useEffect(() => {
        getData();
    });

    const getData = async () => {
        const res = await fetch("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            params: { name: "age" },
        })
        const data = await res.json();
        console.log(data);
    };

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const handleBack = () => {
      setPrev(true);
    }

    const handleNext = () => {
        let error = validate(data);
        if (error === false) {
            setNext(true);
            return;
        }
        alert("Please fill all the fields");
    }

    return (
        <>

            {prev ? <Pinfo ></Pinfo> : <>

                {next ? <Status></Status> :
                    <>
                        <h1 className='font'>Home Address Details</h1><br />
                        <Row className="g-2 mt-2 font">
                            <Col md>
                                <FloatingLabel controlId="floatingTextarea" label="Street and Number" className='font'>
                                    <Form.Control onChange={handleChange} type="email" name='address' placeholder="champ" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-2">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Zip">
                                    <Form.Control onChange={handleChange} type="zip" name='zip' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Town">
                                    <Form.Control onChange={handleChange} type="name" name='town' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <Form.Group controlId="formFile" className="mb-3 font">
                                    <Form.Label className='font'>Proof of Residence</Form.Label>
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

export default Address;
