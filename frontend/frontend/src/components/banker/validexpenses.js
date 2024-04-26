import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ValidIncome from "./validincome";
import ValidGuarId from "./validguarid";
import ValidStudentSalary from "./studentcheck";
import ValidCar from "./validcar";

const ValidExpenses = () => {

    const [prev, setPrev] = useState(false);

    const [data, setData] = useState({
        rent: '',
        other_loans: '',
        total_insurances: '',
        reccuring_expenses: '',
    });

    const [type, setType] = useState({
        type_loan: '',
    });

    const [showStudent, setShowStudent] = useState(false);
    const [showGuarantor, setShowGuarantor] = useState(false);
    const [showCar, setShowCar] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = (data) => {
        let errors = false;
        if (!data.rent) {
            errors = true;
        }
        if (!data.other_loans) {
            errors = true;
        }
        if (!data.total_insurances) {
            errors = true;
        }
        if (!data.reccuring_expenses) {
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
                name: "valid_rent",
                value: data.rent,
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
                name: "valid_amount_other_loans",
                value: data.other_loans,
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
                name: "valid_amount_total_insurances",
                value: data.total_insurances,
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
                name: "valid_amount_reccuring_expenses",
                value: data.reccuring_expenses,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const handleBack = () => {
        setPrev(true);
    }

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
        if (type.type_loan == "student loan") {
            setShowStudent(true);
        }
        if (type.type_loan == "car loan") {
            console.log("car loan");
            setShowCar(true);
        }
        if (type.type_loan == "house loan") {
            setShowGuarantor(true);
        }
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
        type.type_loan = data.type_loan;
        console.log(type);
    };

    useState(() => {
        getData();
    }, []);

    return (
        <>
            {showStudent ? <ValidStudentSalary></ValidStudentSalary> : <>
                {showGuarantor ? <ValidGuarId></ValidGuarId> : <>
                    {showCar ? <ValidCar></ValidCar> : <>
                        {prev ? <ValidIncome></ValidIncome> : <>
                            <h1 className='font'>Expenses</h1><br />
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingSelectGrid"
                                        label="Valid Rent"
                                    >
                                        <Form.Select className="font" onClick={handleChange} name="rent" aria-label="Floating label select example">
                                            <option name="rent" value="valid">Match</option>
                                            <option name="rent" value="not valid">Not Match</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingSelectGrid"
                                        label="Valid Other Loans"
                                    >
                                        <Form.Select className="font" onClick={handleChange} name="other_loans" aria-label="Floating label select example">
                                            <option name="other_loans" value="valid">Match</option>
                                            <option name="other_loans" value="not valid">Not Match</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingSelectGrid"
                                        label="Valid Total Insurances"
                                    >
                                        <Form.Select className="font" onClick={handleChange} name="total_insurances" aria-label="Floating label select example">
                                            <option name="total_insurances" value="valid">Match</option>
                                            <option name="total_insurances" value="not valid">Not Match</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingSelectGrid"
                                        label="Valid Reccuring Expenses"
                                    >
                                        <Form.Select className="font" onClick={handleChange} name="reccuring_expenses" aria-label="Floating label select example">
                                            <option name="reccuring_expenses" value="valid">Match</option>
                                            <option name="reccuring_expenses" value="not valid">Not Match</option>
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
                </>}
            </>}
        </>
    );
}

export default ValidExpenses;