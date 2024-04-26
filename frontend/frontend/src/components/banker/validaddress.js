import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ValidId from "./validid";
import ValidIncome from "./validincome";

const ValidAddress = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);
    
    const [data, setData] = useState({
        address: '',
        street: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.address) {
            errors = true;
        }
        if (!data.street) {
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
                name: "valid_address",
                value: data.address,
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
                name: "valid_street",
                value: data.street,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        let error = validate(data);
        if (error === true) {
            alert("Please fill all the fields");
            return;
        }
        sendData();
        sendData2();
        setNext(true);
    }

    return (
        <>
            {prev ? <ValidId></ValidId> : <>
                {next ? <ValidIncome></ValidIncome> :
                    <>
                        <h1 className='font'>Home address details</h1><br />
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Address"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="address" aria-label="Floating label select example">
                                        <option name="address" value="valid">Valid</option>
                                        <option name="address" value="not valid">Not Valid</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Street"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="street" aria-label="Floating label select example">
                                        <option name="street" value="valid">Match</option>
                                        <option name="street" value="not valid">Not Match</option>
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

export default ValidAddress;