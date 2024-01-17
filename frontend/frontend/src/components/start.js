import React, { useState, useEffect, useMemo } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Home from './home';
import Pinfo from './personal_info';
import App from '../App';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Button from 'react-bootstrap/Button';

const Start = () => {

  const [country, setCountry] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = country => {
    setCountry(country)
    console.log(country);
  }

  const sendData = () => {
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "country",
        value: country.label,
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
    sendData();
    setNext(true);
  }

  return (
    <>

      {prev ? <App></App> : <>
        {next ? <Pinfo></Pinfo> :
          <>
            <Row>
              <Col>
                <h1 className='font'>Where are you from?</h1><br />
                <Select className="font" options={options} value={country} onChange={changeHandler} />
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

export default Start;
