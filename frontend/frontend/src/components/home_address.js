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


const Address = ({ page }) => {

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
        let errors = {};
        if (!data.address) {
            errors.address = 'Address is required';
        }
        if (!data.zip) {
            errors.zip = 'Zip is required';
        }
        if (!data.town) {
            errors.town = 'Town is required';
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
        if (error.address == undefined || error.zip == undefined || error.town == undefined) {
            setPage(page1 + 1);
            return;
        }
        alert("Please fill all the fields");
    }

    return (
        <>

            {page1 === 2 ? <Pinfo page={page1}></Pinfo> : <>

                {page1 === 4 ? <Status page={page1}></Status> :
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
