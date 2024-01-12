import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from './components/start';
import Container from 'react-bootstrap/esm/Container';


const App = () => {

  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log("app:" + page);
  }
  );

  useState(() => {
    console.log("app" + page);
  }
  );

  const handleNext = () => {
    setPage(page + 1);
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
        {page === 0 &&
          <>
            <h1>Welcome</h1><br />
            <h4>Press next to start</h4>
            <button className="contact-btn rounded-pill font" onClick={handleNext} size="sm">
              Next
            </button>
          </>}
        {page === 1 &&
          <Start page={page}></Start>}
      </div >
    </>
  );
}

export default App;
