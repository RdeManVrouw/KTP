import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Slider from '@mui/material/Slider';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Calculator from './loan';

const Final = (params) => {

    const [prev, setPrev] = useState(false);

    const handleBack = () => {
        setPrev(true);
    }

    return (
        <>
            {prev ? <Calculator></Calculator> : <>
                <div className='font'><h1>Your Final Loan Details</h1></div>
                <Row className='mt-5'>
                    <Col>
                        <h5 className='font'>Loan Amount</h5>
                        {params.data.loanAmount.toFixed(2)}€
                    </Col>
                </Row> 
                <Row className='mt-5'>
                    <Col>
                        <h5 className='font'>Montly Repayments</h5>
                        {(params.data.loanAmount / params.data.duration).toFixed(2)}€
                    </Col>
                    <Col>
                        <h5 className='font'>Duration</h5>
                        {params.data.duration} months
                    </Col>
                    <Col>
                        <h5 className='font'>Total Interest</h5>
                        {params.data.interest_rate}%
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Button className="contact-btn rounded-pill font" onClick={handleBack} size="md">
                        Back
                    </Button>
                </Row>
            </>}
        </>

    );
}

export default Final;

