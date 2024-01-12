import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Home from './home';

const Student = ({ page }) => {

    const [page1, setPage] = useState(page);

    useEffect(() => {
        // console.log("pinfo:" + page1);
    }
    );

    const handleBack = () => {
        setPage(page1 - 1);
    }

    const handleNext = () => {
        setPage(page1 + 1);
    }

    return (
        <>
            {page1 === 3 ? <Home page={page1}></Home> : <>
                <div className='font'><h1>Student</h1></div>
                <Row className='mb-4' />
                <Row>
                    <Col>
                        <button className="contact-btn rounded-pill font" onClick={handleBack} size="sm">
                            Back
                        </button>
                    </Col>
                    <Col>
                        <button className="contact-btn rounded-pill font" onClick={handleNext} size="sm">
                            Next
                        </button>
                    </Col>
                </Row>
            </>
            }
        </>
    );
}

export default Student;