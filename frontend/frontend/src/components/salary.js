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
import Status from './home_address';
import Expenses from './expenses';


const Salary = () => {

    const [data, setData] = useState({
        salary: '',
        income: '',
    });

    const [flag, setFlag] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        const res = await fetch("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        console.log(data);
    };

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "age",
                value: data.age * 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const [show, setShow] = useState(false);

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        if (data.salary === '' && data.income === '') {
            setShow(true);
            return;
        }
        setNext(true);
    }

    return (
        <>

            {prev ? <Status></Status> : <>

                {next ? <Expenses></Expenses> :
                    <>
                        <h1 className='font'>Payslip</h1><br />
                        <Row className="g-2 mt-2 font">
                            <Col md>
                                <FloatingLabel controlId="floatingTextarea" label="Salary" className='font'>
                                    <Form.Control onChange={handleChange} type="number" name='salary' placeholder="champ" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        {!show ? <> </> :
                            <Row className="g-2 mt-2">
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="Income">
                                        <Form.Control onChange={handleChange} type="income" name='income' placeholder="111234" />
                                    </FloatingLabel>
                                </Col>
                            </Row>}
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

export default Salary;
