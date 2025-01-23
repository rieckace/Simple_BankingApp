import React, { useState, useEffect } from 'react';
import Login from './Login'; 
import './App.css'; 

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [transaction, setTransaction] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [statements, setStatements] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [showStatements, setShowStatements] = useState(false);

  useEffect(() => {
    const savedStatements = JSON.parse(localStorage.getItem('statements')) || [];
    setStatements(savedStatements);
  }, []);


  useEffect(() => {
    localStorage.setItem('statements', JSON.stringify(statements));
  }, [statements]);



  function bank(e) {
    e.preventDefault();
    if (!transaction) {
      alert('Please select a transaction');
    } else if (amount <= 0) {
      alert('Please enter a valid amount');
    } else {
      let newBalance = balance;
      if (transaction === 'deposit') {
        newBalance = balance + parseFloat(amount);
      } else if (transaction === 'withdraw') {
        if (balance >= amount) {
          newBalance = balance - parseFloat(amount);
        } else {
          alert('Insufficient Balance!');
          return;
        }
      }


      setBalance(newBalance);
      const newStatement = { date, transaction, amount: parseFloat(amount) };
      setStatements([...statements, newStatement]);
      setAmount(0);
    }
  }

  if (!loggedIn) {
    return <Login onLogin={setLoggedIn} />;
  }

  return (
    <div className="container">
      <h2
      style={{display:'flex',
        justifyContent:'center',
        background:'linear-gradient(to right, #ff7e5f,rgb(19, 153, 142))',
        fontFamily:'cursive',
        backgroundClip:'text',
        color:'transparent',
        padding:'10px',
        margin:'10px',
        fontSize:'30px',

      }}>Global Ime Bank Ltd </h2>
      <label>Choose your Transaction:</label>
      <select onChange={(e) => setTransaction(e.target.value)} value={transaction}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>

      <br /><br />
      <label>Enter Amount:</label>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(parseFloat(e.target.value))} 
      />
      <br /><br />
      <button onClick={bank}>Submit</button>
      <h3>Current Balance: Rs.{balance.toFixed(2)}</h3>
      
      <button onClick={() => setShowStatements(!showStatements)}>
        {showStatements ? 'Hide' : 'Show'} Transaction Statements
      </button>
      {showStatements && (
        <div>
          <h3>Transaction Statements</h3>
          <ul>
            {statements.map((statement, index) => (
              <li key={index}>
                Date: {statement.date}, 
                Type: {statement.transaction}, 
                Amount: Rs.{statement.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
