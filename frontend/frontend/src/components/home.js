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

    const [page1, setPage] = useState(page);

    useEffect(() => {
        // console.log("home:" + page1);
    }
    );

    const studentFlag = () => {
        setflag1(true);
        setPage(page1 + 1);
        setShow(false);
    }

    const housingFlag = () => {
        setflag2(true);
        setPage(page1 + 1);
        setShow2(false);
    }

    const carFlag = () => {
        setflag3(true);
        setPage(page1 + 1);
        setShow3(false);
    }

    const handleBack = () => {
        setPage(page1 - 1);
    }

    return (
        <>
            {flag1 ? <Student page={page1}></Student> : <>
                {flag2 ? <House page={page1}></House> : <>
                    {flag3 ? <Car page={page1}></Car> : <>
                        {page1 == 4 ? <Status page={page1}></Status> : <>

                            <button className="contact-btn rounded-pill font" variant="primary" onClick={handleShow1}>
                                Student Loans
                            </button>

                            <button className="contact-btn rounded-pill font mt-3" variant="primary" onClick={handleShow2}>
                                Housing Loans
                            </button>

                            <button className="contact-btn rounded-pill font mt-3" variant="primary" onClick={handleShow3}>
                                Student Loans
                            </button>

                            <Row className='mt-5'>
                                <Col>
                                    <button className="contact-btn rounded-pill font" onClick={handleBack} size="sm">
                                        Back
                                    </button>
                                </Col>
                            </Row>
                        </>}
                    </>}
                </>}
            </>}

            <Modal className="font background" show={show1} scrollable="true" onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title className="font">Student Loans</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font">Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="contact-btn rounded-pill font" variant="secondary" onClick={handleClose1}>
                        Close
                    </button>
                    <button className="contact-btn rounded-pill font" variant="secondary" onClick={studentFlag}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal className="font" show={show2} scrollable="true" onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title className="font">Housing Loans</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font">Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="contact-btn rounded-pill font" variant="secondary" onClick={handleClose2}>
                        Close
                    </button>
                    <button className="contact-btn rounded-pill font" variant="secondary" onClick={housingFlag}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal className="font" show={show3} scrollable="true" onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title className="font">Car Loans</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font">Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="contact-btn rounded-pill font" variant="secondary" onClick={handleClose3}>
                        Close
                    </button>
                    <button className="contact-btn rounded-pill font" variant="secondary" onClick={carFlag}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Home;