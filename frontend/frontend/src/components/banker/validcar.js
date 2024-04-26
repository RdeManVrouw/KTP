import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ValidExpenses from "./validexpenses";
import Calculator from "../customer/loan";

const ValidCar = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const [data, setData] = useState({
        price: '',
        age: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.price) {
            errors = true;
        }
        if (!data.age) {
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
                name: "valid_car_price",
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
                name: "valid_car_age",
                value: data.age,
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
                {next ? <Calculator></Calculator> :
                    <>
                        <h1 className='font'>Car Details</h1><br />
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
                                    label="Valid New/Used"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="age" aria-label="Floating label select example">
                                        <option name="age" value="valid">Match</option>
                                        <option name="age" value="not valid">Not Match</option>
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

export default ValidCar;