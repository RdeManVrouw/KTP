import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Start from './start';
import Button from 'react-bootstrap/Button';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Home from './home';
import Salary from './salary';


const Expenses = () => {

    const [data, setData] = useState({
        rent: '',
        loans: '',
        insurance: '',
        bills: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "expenses",
                value: data.rent * 1 + data.loans * 1 + data.insurance * 1 + data.bills * 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const validate = (data) => {
        let errors = false;
        if (!data.rent) {
            errors = true;
        }
        if (!data.loans) {
            errors = true;
        }
        if (!data.insurance) {
            errors = true;
        }
        if (!data.bills) {
            errors = true;
        }

        return errors;
    };


    // useEffect(() => {
    //     fetch("http://localhost:3000/")
    //         .then((res) => res.json())
    //         .then((data) => setMessage(data.message));
    // }, []);

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);
  
    const handleBack = () => {
      setPrev(true);
    }

    const handleNext = () => {
        let error = validate(data);
        if (error === false) {
            sendData();
            setNext(true);
            return;
        }
        alert("Please fill all the fields");
    }

    return (
        <>

            {prev ? <Salary></Salary> : <>

                {next ? <Home></Home> :
                    <>
                        <h1 className='font'>Expenses</h1><br />
                        <Row className="g-2 mt-2">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Rent">
                                    <Form.Control onChange={handleChange} type="number" name='rent' placeholder="champ" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Loans">
                                    <Form.Control onChange={handleChange} type="number" name='loans' placeholder="pan" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Insurance">
                                    <Form.Control onChange={handleChange} type="number" name='insurance' placeholder="111234" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingInputGrid" label="Bills">
                                    <Form.Control onChange={handleChange} type="number" name="bills" placeholder="18+" />
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

export default Expenses;
