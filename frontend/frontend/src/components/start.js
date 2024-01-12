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


const Start = ({ page }) => {

  const [country, setCountry] = useState('');
  const options = useMemo(() => countryList().getData(), [])

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
        country: country,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const [page1, setPage] = useState(page);

  useEffect(() => {
    // console.log("start:" + page1);
  }
  );

  const handleBack = () => {
    setPage(page1 - 1);
  }

  const handleNext = () => {
    sendData();
    setPage(page1 + 1);
  }

  return (
    <>

      {page1 === 0 ? <App page={page1}></App> : <>
        {page1 === 2 ? <Pinfo page={page1}></Pinfo> :
          <>
            <Row>
              <Col>
                <h1 className='font'>Where are you from?</h1><br />
                <Select className="font" options={options} value={country} onChange={changeHandler} />
              </Col>
            </Row>
            <Row className='mt-5'>
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
      </>}
    </>
  );
}

export default Start;
