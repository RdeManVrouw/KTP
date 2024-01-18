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
import Calculator from './loan';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Student from './student';

const Student2 = () => {

    const [data, setData] = useState({
        rent: '',
        housing: '',
    });

    const [flag, setFlag] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (data.housing === 'YES') {
            setFlag(true);
        }
        console.log(data);
    };

    const validate = () => {
        if (!data.housing) {
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
                name: "housing",
                value: data.housing,
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
                name: "rent2",
                value: data.rent * 1,
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
            alert('Please fill out all fields');
            return;
        }
        sendData();
        if (data.housing === 'YES') {
            sendData2();
        }
        setNext(true);
    }

    return (
        <>
            {prev ? <Student></Student> : <>
                {next ? <Calculator></Calculator> : <>
                    <div className='font'><h1>Housing Situation</h1></div>
                    <Row className='mt-5'>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Housing"
                            >
                                <Form.Select onClick={handleChange} name="housing" aria-label="Floating label select example">
                                    <option name="housing" value="NO">With parents - no new rent</option>
                                    <option name="housing" value="YES">Alone - new rent</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    {flag ? <>
                        <Row className='mt-3'>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea" label="Rent" className='font'>
                                    <Form.Control onChange={handleChange} type="number" name='rent' placeholder="" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </> : <></>}
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

export default Student2;