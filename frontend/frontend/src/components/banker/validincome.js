import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ValidAddress from "./validaddress";
import ValidExpenses from "./validexpenses";

const ValidIncome = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);
    
    const [data, setData] = useState({
        employment: '',
        salary: '',
        expenses: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.employment) {
            errors = true;
        }
        if (!data.salary) {
            errors = true;
        }
        if (!data.expenses) {
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
                name: "valid_employment",
                value: data.employment,
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
                name: "valid_salary",
                value: data.salary,
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
                name: "valid_expenses",
                value: data.expenses,
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
        setNext(true);
    }

    return (
        <>
            {prev ? <ValidAddress></ValidAddress> : <>
                {next ? <ValidExpenses></ValidExpenses>:
                    <>
                        <h1 className='font'>Income and Expenses</h1><br />
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Employment"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="employment" aria-label="Floating label select example">
                                        <option name="employment" value="valid">Valid</option>
                                        <option name="employment" value="not valid">Not Valid</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Salary"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="salary" aria-label="Floating label select example">
                                        <option name="salary" value="valid">Match</option>
                                        <option name="salary" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Expenses"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="expenses" aria-label="Floating label select example">
                                        <option name="expenses" value="valid">Match</option>
                                        <option name="expenses" value="not valid">Not Match</option>
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

export default ValidIncome;