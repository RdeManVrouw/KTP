import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ValidExpenses from "./validexpenses";
import Calculator from "../customer/loan";

const ValidStudentSalary = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const [data, setData] = useState({
        father: '',
        mother: '',
        fees: '',
        duration: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.father) {
            errors = true;
        }
        if (!data.mother) {
            errors = true;
        }
        if (!data.fees) {
            errors = true;
        }
        if (!data.duration) {
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
                name: "valid_father_income",
                value: data.father,
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
                name: "valid_mother_income",
                value: data.mother,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData3 = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "valid_fees",
                value: data.fees,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData4 = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "valid_duration",
                value: data.duration,
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
        sendData3();
        sendData4();
        setNext(true);
    }

    return (
        <>
            {prev ? <ValidExpenses></ValidExpenses> : <>
                {next ? <Calculator></Calculator> :
                    <>
                        <h1 className='font'>Parents Salary or Income</h1><br />
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Father Salary"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="father" aria-label="Floating label select example">
                                        <option name="father" value="valid">Match</option>
                                        <option name="father" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Mother Salary"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="mother" aria-label="Floating label select example">
                                        <option name="mother" value="valid">Match</option>
                                        <option name="mother" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Fees"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="fees" aria-label="Floating label select example">
                                        <option name="fees" value="valid">Match</option>
                                        <option name="fees" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Duration"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="duration" aria-label="Floating label select example">
                                        <option name="duration" value="valid">Match</option>
                                        <option name="duration" value="not valid">Not Match</option>
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

export default ValidStudentSalary;