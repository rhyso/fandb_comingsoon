import React from 'react';
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
  return (
    <div className="App">
     <div className="main-div">
      <h1>The new way to hire event space in the outdoors</h1>
      <h2>Sign up to hear updates</h2>
     </div>

     <div className="email-input">
       <input type="text" placeholder="Email Address" />
       <Button primary>Sign up</Button>
     </div>
    </div>
  );
}

export default App;
