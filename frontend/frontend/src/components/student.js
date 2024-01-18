import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Home from './home';
import Button from 'react-bootstrap/Button';
import Student2 from './student2';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Student = () => {

    const [data, setData] = useState({
        mother_income: '',
        father_income: '',
        tution_fees: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const validate = () => {
        if (!data.mother_income) {
            return false;
        }
        if (!data.father_income) {
            return false;
        }
        if (!data.tution_fees) {
            return false;
        }
        return true;
    };

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "total_income",
                value: data.father_income * 1 + data.mother_income * 1,
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
                name: "tution",
                value: data.tution_fees * 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        if (validate() === false) {
            alert("Please fill in all the fields");
            return;
        }
        sendData();
        sendData2();
        setNext(true);
    }

    return (
        <>
            {prev ? <Home></Home> : <>
                {next ? <Student2></Student2> :
                    <>
                        <div className='font'><h1>Student Loans</h1></div>
                        <Row className='mt-5'>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea" label="Mother's Salary" className='font'>
                                    <Form.Control onChange={handleChange} type="number" name='mother_income' placeholder="" />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea" label="Father's Salary" className='font'>
                                    <Form.Control onChange={handleChange} type="number" name='father_income' placeholder="" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea" label="Tution Fees" className='font'>
                                    <Form.Control onChange={handleChange} type="number" name='tution_fees' placeholder="" />
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
                    </>}
            </>}
        </>
    );
}

export default Student;