import React, { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Home from "../customer/home";
import ValidId from "./validid";


const StartBanker = () => {

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);

    const [data, setData] = useState({
        number: '',
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const validate = () => {
        let errors = false;
        if (!data.number) {
            errors = true;
        }

        return errors;
    }

    const sendData = () => {
        fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "banker_number",
                value: data.number * 1,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }

    const handleBack = () => {
        setPrev(true);
    }

    const handleNext = () => {
        let error = validate();
        if (error === true) {
            alert("Please fill the field");
            return;
        }
        sendData();
        setNext(true);
    }

    return (
        <>
            {prev ? <Home></Home> : <> 
                {next ? <ValidId></ValidId> : 
                    <>
                        <h1 className='font'>Document Check</h1><br />
                        <Row className="g-2 mt-2 font">
                            <Col md>
                                <FloatingLabel className="font" controlId="floatingTextarea" label="Banker's Number">
                                    <Form.Control className="font" onChange={handleChange} type="email" name='number' placeholder="champ" />
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
export default StartBanker;