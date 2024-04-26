import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';
import Form from 'react-bootstrap/Form'
import Slider from '@mui/material/Slider';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Final from './final';

const Calculator = () => {

    const [data2, setData] = useState({
        loanAmount: '',
        duration: '',
        interest_rate: 0.5,
    });

    const [values, setValues] = useState({
        loan_upper: 1000,
        max_months_to_pay_back: 12,
    });

    const handleChange = (e) => {
        setData({ ...data2, [e.target.name]: e.target.value });
    }

    useEffect(() => {
    }, [values]);

    const getData = async () => {
        console.log('here');
        const res = await fetch("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        console.log(data);
        if (!checkData(data)) {
            alert('You can not get a loan at the moment');
            return;
        }
        if (data.type_loan === 'house loan') {
            if (!checkHouse(data)) {
                alert('You can not get a loan at the moment');
                return;
            }
        }
        if (data.type_loan === 'student loan') {
            if (!checkStudent(data)) {
                alert('You can not get a loan at the moment');
                return;
            }
        }
        if (data.type_loan === 'car loan') {
            if (!checkCar(data)) {
                alert('You can not get a loan at the moment');
                return;
            }
        }
        console.log('here2');
        setValues({
            loan_upper: data.amount_loan_upper,
            max_months_to_pay_back: data.max_months_to_pay_back,
        });
        data2.interest_rate = data.interest_rate;
        console.log(values);
    };

    const checkData = (data) => {
        if (data.valid_id == "valid" && data.valid_salary == "valid" && data.valid_expenses == "valid" && data.valid_name == "valid" && data.valid_age == "valid" && data.valid_nat == "valid" && data.valid_address == "valid" && data.valid_street == "valid" && data.valid_amount_other_loans == "valid" && data.valid_amount_reccuring_expenses == "valid" && data.valid_amount_total_insurances == "valid") {
            return true;
        }
        console.log('here');
        return false;
    }

    const checkHouse = (data) => {
        if (data.valid_guar_salary == "valid" && data.valid_guar_expenses == "valid" && data.valid_guar_name == "valid" && data.valid_guar_age == "valid" && data.valid_guar_nat == "valid") {
            return true;
        }
        console.log('here1');
        return false;
    }

    const checkStudent = (data) => {
        if (data.valid_father_income == "valid" && data.valid_mother_income == "valid") {
            return true;
        }
        console.log('here2');
        return false;
    }

    const checkCar = (data) => {
        if (data.valid_car_price == "valid" && data.valid_car_age == "valid") {
            return true;
        }
        console.log('here3');
        return false;
    }


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
                    {next ? <Final data={data2}></Final> : <>
                        <div className='font'><h1>Loan Information</h1></div>
                        <Row className='mt-5'>
                            <Col>
                                <h5 className='font'>Loan Amount</h5>
                                <FloatingLabel controlId="floatingTextarea" label={data2.loanAmount} className='font'>
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
                                <FloatingLabel controlId="floatingTextarea" label={data2.duration} className='font'>
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
                                {values.loan_upper}€
                            </Col>
                            <Col>
                                <h5 className='font'>Max Duration</h5>
                                {values.max_months_to_pay_back} months
                            </Col>
                            <Col>
                                <h5 className='font'>Total Interest</h5>
                                {data2.interest_rate}%
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

