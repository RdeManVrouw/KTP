import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ValidExpenses from "./validexpenses";
import ValidGuarId from "./validguarid";

const ValidHouse = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const [data, setData] = useState({
        price: '',
        buy_or_renovate: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.price) {
            errors = true;
        }
        if (!data.buy_or_renovate) {
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
                name: "valid_price_house",
                value: data.price,
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
                name: "valid_reno_or_buy",
                value: data.buy_or_renovate,
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
            {prev ? <ValidExpenses></ValidExpenses> : <>
                {next ? <ValidGuarId></ValidGuarId> :
                    <>
                        <h1 className='font'>House Details</h1><br />
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Price"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="price" aria-label="Floating label select example">
                                        <option name="price" value="valid">Match</option>
                                        <option name="price" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Buy/Renovate"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="buy_or_renovate" aria-label="Floating label select example">
                                        <option name="buy_or_renovate" value="valid">Match</option>
                                        <option name="buy_or_renovate" value="not valid">Not Match</option>
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

export default ValidHouse;