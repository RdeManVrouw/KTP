import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';
import Form from 'react-bootstrap/Form'
import Slider from '@mui/material/Slider';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Final from './final';

const Calculator = () => {

    const [data, setData] = useState({
        loanAmount: '',
        duration: '',
        interest_rate: '',
    });

    const [values, setValues] = useState({
        loan_upper: 1000,
        max_months_to_pay_back: 12,
        interest_rate: 0.5,
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        console.log(values);
    }, [values]);

    const getData = async () => {
        const res = await fetch("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        values.loan_upper = data.loan_upper;
        values.max_months_to_pay_back = data.max_months_to_pay_back;
        values.interest_rate = data.interest_rate;
        data.interest_rate = values.interest_rate;
        console.log(values);
    };

    useState(() => {
        getData();
    }
        , []);

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        setNext(true);
    }

    return (
        <>
            {prev ? <Home></Home> : <>
                {next ? <Final data={data}></Final> : <>
                    <div className='font'><h1>Loan Information</h1></div>
                    <Row className='mt-5'>
                        <Col>
                            <h5 className='font'>Loan Amount</h5>
                            <FloatingLabel controlId="floatingTextarea" label={data.loanAmount} className='font'>
                                <Form.Control onChange={handleChange} type="number" name='loanAmount' placeholder="" />
                            </FloatingLabel>
                            <Slider
                                className='mt-4'
                                name='loanAmount'
                                min={0}
                                step={100}
                                max={values.loan_upper}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="non-linear-slider"
                            />
                        </Col>
                        <Col>
                            <h5 className='font'>Duration</h5>
                            <FloatingLabel controlId="floatingTextarea" label={data.duration} className='font'>
                                <Form.Control onChange={handleChange} type="number" name='duration' placeholder="" />
                            </FloatingLabel>
                            <Slider
                                className='mt-4'
                                name='duration'
                                min={0}
                                step={1}
                                max={values.max_months_to_pay_back}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="non-linear-slider"
                            />
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col>
                            <h5 className='font'>Max Loan Amount</h5>
                            {values.loan_upper.toFixed(2)}€
                        </Col>
                        <Col>
                            <h5 className='font'>Max Duration</h5>
                            {values.max_months_to_pay_back} months
                        </Col>
                        <Col>
                            <h5 className='font'>Total Interest</h5>
                            {values.interest_rate}%
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
                </>}
            </>}
        </>

    );
}

export default Calculator;

