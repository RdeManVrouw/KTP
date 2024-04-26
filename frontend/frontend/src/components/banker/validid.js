import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import StartBanker from "./startbanker";
import ValidAddress from "./validaddress";

const ValidId = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);
    
    const [data, setData] = useState({
        id: '',
        name: '',
        age: '',
        nationality: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.id) {
            errors = true;
        }
        if (!data.name) {
            errors = true;
        }
        if (!data.age) {
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
                name: "valid_id",
                value: data.id,
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
                name: "valid_name",
                value: data.name,
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
                name: "valid_age",
                value: data.age,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const sendData4 = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "valid_nat",
                value: data.nationality
            })
        })
    }

    const handleBack = () => {
        setPrev(true);
    }

    const getData = async () => {
        console.log("get data");
        const res = await fetch("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data);
        if (data.banker_number !== 1234) {
            alert("You have no access to this page");
            handleBack();
        }
    };

    useState(() => {
        getData();
    }, []);

    const handleNext = () => {
        let error = validate(data);
        if (error === true) {
            alert("Please fill all the fields");
            return;
        }
        sendData();
        sendData2();
        sendData3();
        sendData4();
        setNext(true);
    }

    return (
        <>
            {prev ? <StartBanker></StartBanker> : <>
                {next ? <ValidAddress></ValidAddress> :
                    <>
                        <h1 className='font'>Identity Details</h1><br />
                        <Row className="g-2 mt-3">
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid ID"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="id" aria-label="Floating label select example">
                                        <option name="id" value="valid">Not Expired</option>
                                        <option name="id" value="not valid">Expired</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Name"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="name" aria-label="Floating label select example">
                                        <option name="name" value="valid">Match</option>
                                        <option name="name" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Age"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="age" aria-label="Floating label select example">
                                        <option name="age" value="valid">Match</option>
                                        <option name="age" value="not valid">Not Match</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    controlId="floatingSelectGrid"
                                    label="Valid Nationality"
                                >
                                    <Form.Select className="font" onClick={handleChange} name="nationality" aria-label="Floating label select example">
                                        <option name="nationality" value="valid">Match</option>
                                        <option name="nationality" value="not valid">Not Match</option>
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

export default ValidId;