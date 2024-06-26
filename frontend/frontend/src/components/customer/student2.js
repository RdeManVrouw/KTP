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
import StartBanker from '../banker/startbanker';
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
        if (data.housing === 'NO') {
            console.log('YES');
            setFlag(true);
        }else{
            setFlag(false);
        }
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
                name: "type_loan",
                value: "student loan",
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData2 = (value) => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "live_with_your_parents",
                value: value,
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
                name: "amount_student_rent",
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
        if (data.housing === 'YES') {
            sendData();
            sendData2(true);
            sendData3();
            setNext(true);
            return;
        }
        // sendData();
        sendData2(false);
        setNext(true);
    }

    return (
        <>
            {prev ? <Student></Student> : <>
                {next ? <StartBanker></StartBanker> : <>
                    <div className='font'><h1>Housing Situation</h1></div>
                    <Row className='mt-5'>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Housing"
                            >
                                <Form.Select className="font" onClick={handleChange} name="housing" aria-label="Floating label select example">
                                    <option name="housing" value="YES">With parents - no new rent</option>
                                    <option name="housing" value="NO">Alone - new rent</option>
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