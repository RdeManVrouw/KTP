import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';
import Form from 'react-bootstrap/Form'
import Slider from '@mui/material/Slider';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Calculator = () => {

    const [data, setData] = useState({
        loanAmount: '',
        duration: '',
        interest_rate: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    }

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
                {next ? <></> : <>
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
                                min={5}
                                step={1}
                                max={30}
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
                                min={5}
                                step={1}
                                max={30}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="non-linear-slider"
                            />
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col>
                            <FloatingLabel controlId="floatingTextarea" label="Interest Rate" className='font'>
                                <Form.Control onChange={handleChange} type="number" name='interest_rate' placeholder="5%" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col>
                            <h5 className='font'>Monthly Payment</h5>
                            {0}
                        </Col>
                        <Col>
                            <h5 className='font'>Total Payment</h5>
                            {0}
                        </Col>
                        <Col>
                            <h5 className='font'>Total Interest</h5>
                            {0} 
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

