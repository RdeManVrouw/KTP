import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Student from './student';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Start from './start';
import Status from './status';
import House from './house';
import Car from './car';

const Home = ({ page }) => {

    const [show1, setShow] = useState(false);

    const handleClose1 = () => setShow(false);
    const handleShow1 = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [flag1, setflag1] = useState(false);
    const [flag2, setflag2] = useState(false);
    const [flag3, setflag3] = useState(false);

    const [prev, setPrev] = useState(false);

    const studentFlag = () => {
        setflag1(true);
        setShow(false);
    }

    const housingFlag = () => {
        setflag2(true);
        setShow2(false);
    }

    const carFlag = () => {
        setflag3(true);
        setShow3(false);
    }

    const handleBack = () => {
        setPrev(true);
    }

    return (
        <>
            {flag1 ? <Student></Student> : <>
                {flag2 ? <House></House> : <>
                    {flag3 ? <Car></Car> : <>
                        {prev ? <Status></Status> : <>

                            <Button className="contact-btn rounded-pill font" size="lg" variant="primary" onClick={handleShow1}>
                                Student Loans
                            </Button>

                            <Button className="contact-btn rounded-pill font mt-3" size="lg" variant="primary" onClick={handleShow2}>
                                Housing Loans
                            </Button>

                            <Button className="contact-btn rounded-pill font mt-3" size="lg" variant="primary" onClick={handleShow3}>
                                Car Loans
                            </Button>

                            <Row className='mt-5'>
                                <Col>
                                    <Button className="contact-btn rounded-pill font" onClick={handleBack} size="md">
                                        Back
                                    </Button>
                                </Col>
                            </Row>
                        </>}
                    </>}
                </>}
            </>}

            <Modal className="font" show={show1} scrollable="true" onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title className="font">Student Loans</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font">Intended to cover the cost of tuition, books and supplies, and living expenses while the borrower is in the process of pursuing a degree</Modal.Body>
                <Modal.Footer>
                    <Button className="contact-btn rounded-pill font" variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button className="contact-btn rounded-pill font" variant="secondary" onClick={studentFlag}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className="font" show={show2} scrollable="true" onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title className="font">Housing Loans</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font">Buy a new or a resale home, construct a home or renovate or extend an existing one</Modal.Body>
                <Modal.Footer>
                    <Button className="contact-btn rounded-pill font" variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button className="contact-btn rounded-pill font" variant="secondary" onClick={housingFlag}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className="font" show={show3} scrollable="true" onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title className="font">Car Loans</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font">Buying a new or used car can be complicated. However, breaking it down into simple steps will help you avoid car shopping’s biggest headaches.</Modal.Body>
                <Modal.Footer>
                    <Button className="contact-btn rounded-pill font" variant="secondary" onClick={handleClose3}>
                        Close
                    </Button>
                    <Button className="contact-btn rounded-pill font" variant="secondary" onClick={carFlag}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;