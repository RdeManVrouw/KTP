import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from './components/start';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const App = () => {

  const [next, setNext] = useState(false);

  const handleNext = () => {
    setNext(true);
  }

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
      }} className='font'>
        {next ? <Start></Start> :
          <>
            <h1>Welcome</h1><br />
            <h4>Press next to start</h4>
            <Button className="contact-btn rounded-pill font" onClick={handleNext} size="md">
              Next
            </Button>
          </>}
      </div >
    </>
  );
}

export default App;
