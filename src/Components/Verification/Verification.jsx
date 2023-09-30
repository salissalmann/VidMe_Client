import React, { useState, useEffect } from 'react';
import NavigationBar from '../../GlobalComponents/SeekerNavbar/Navbar';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Verification.css';
const emailjs = require('emailjs-com');

export default function Verification() {
  const initialTime = 300;
  const [time, setTime] = useState(initialTime);
  const location = useLocation();
  const { Email, Name } = location.state || {};
  const [CodeInput, setCodeInput] = useState(0);
  const [CodeCheck, setCodeCheck] = useState(0);
  let Counter = 1;
  const Navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    if (Counter === 1) {
      let VerificationCode = generateRandomCode();
      emailjs.send("service_5kuu3uf", "template_w5bil8n", {
        to_name: Name,
        code: VerificationCode,
        send_to: Email,
      }, 'DFHbcKqyC2Zzmeu0V');
      setCodeCheck(VerificationCode);
      Counter = 2;
    }
  }, [Counter])


  const handleCode = (event) => {
    setCodeInput(event.target.value);
    document.getElementById('NotFound').style.setProperty('display', 'none', 'important');
    document.getElementById('TimeOver').style.setProperty('display', 'none', 'important');
  }

  const InputCode = document.getElementById("InputCode");
  InputCode?.addEventListener("input", function (event) {
    const inputValue = event.target.value;
    const lastCharacter = inputValue.charAt(inputValue.length - 1);
    const SurNameCheck = /^[0-9]+$/;

    if (!SurNameCheck.test(lastCharacter) || inputValue.length === 12) {
      event.target.value = inputValue.slice(0, -1);
    }
  });


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      Submit();
    }
  };

  const Submit = async () => {
    const numberInp = parseInt(CodeInput);
    const numberCheck = parseInt(CodeCheck);
    if (numberInp === numberCheck && time > 0) {
      const formData = {
        Email: Email,
      }
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/UpdateVerification`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      Navigate("/");
    }
    else {
      if (time > 0) {
        document.getElementById('NotFound').style.setProperty('display', 'flex', 'important');
      }
      else {
        document.getElementById('TimeOver').style.setProperty('display', 'flex', 'important');
      }
    }
  }

  function generateRandomCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const SendEmail = () => {
    let VerificationCode = generateRandomCode();
    emailjs.send("service_5kuu3uf", "template_w5bil8n", {
      to_name: Name,
      code: VerificationCode,
      send_to: Email,
    }, 'DFHbcKqyC2Zzmeu0V');
    setCodeCheck(VerificationCode);
  }

  return (
    <>
      <NavigationBar />

      <div className='Verification-div'>
        <div style={{ marginTop: '20px' }}>
          <h1>Email Verification</h1>
        </div>
        <div class="coolinput">
          <label htmlFor="input" className="text">Enter Code:</label>
          <input type="text" id='InputCode' placeholder="Write here..." name="input" class="input" onChange={handleCode} onKeyDown={handleKey} />
        </div>
        <div id='NotFound' style={{ display: 'none' }}>
          <span className='font-custom-HM' style={{ color: 'red', marginLeft: '16%' }}>Entered Code does not match. Try Again.</span>
        </div>
        <div id='TimeOver' style={{ display: 'none' }}>
          <span className='font-custom-HM' style={{ color: 'red', marginLeft: '18%' }}>Time is Over. Click below to resend.</span>
        </div>
        <div style={{ display: 'inline-flex' }}>
          <span className='font-custom-HM' style={{ marginTop: '1px' }}>If you did not recieve an email</span>
          <button style={{ border: 'none', color: '#7D88F0', fontSize: '1rem' }} className='font-custom-HM' onClick={SendEmail}>Click Here</button>
        </div>
        <div className="timer">
          {formatTime(time)}
        </div>
        <button class="submitBtn" onClick={Submit}>
          Submit
          <svg fill="white" viewBox="0 0 448 512" height="1em" class="arrow"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
        </button>
      </div>
    </>
  )
}
