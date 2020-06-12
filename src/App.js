import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  padding:10px 20px;
`;


function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const checkEmail = () => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);

  }
  const storeEmail = () =>{
    if (!email){
      setError('No Email entered')
    }
    else if(!checkEmail()){
      setError('Email incorrect format')
    }
    else{
      setError("")
      setSuccess('Sign up successfull')
    }
  }
  return (
    <div className="App">
     <div className="main-div">
      <h1>The new way to hire event space in the outdoors</h1>
      <h2>Sign up to hear updates</h2>
     </div>

     <div className="email-input">
       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
       { 
        error &&
        <p>{error}</p>
       }
       { 
        success &&
        <p>{success}</p>
       }
       <Button primary onClick={(e) => storeEmail()}>Sign up</Button>
     </div>
    </div>
  );
}

export default App;
