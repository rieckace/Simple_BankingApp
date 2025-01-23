import React, { useState } from 'react';
import logo from './b1.png';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [deleteUsername, setDeleteUsername] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    if (account) {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleNewAccount = (e) => {
    e.preventDefault();
    const newAccount = { username, password };
    setAccounts([...accounts, newAccount]);
    alert('New account created successfully!');
    setIsNewAccount(false);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password reset link sent!');
    setIsForgotPassword(false);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    const index = accounts.findIndex(acc => acc.username === deleteUsername && acc.password === deletePassword);
    if (index !== -1) {
      setAccounts(accounts.filter((_, i) => i !== index));
      alert('Account deleted successfully!');
    } else {
      alert('Invalid username or password for deletion');
    }
  };

  return (
    <div className="login-container">
      <h1>Welcoming You To The</h1>
      <img src={logo} alt="Bank Logo" className="bank-logo" />
      <p>Address: People Plaza, Bouddha, Kathmandu, Nepal</p>
      <p>Contact: 9803832327, 9762287287</p>
      <h2>{isNewAccount ? 'Create New Account' : isForgotPassword ? 'Forgot Password' : 'Login'}</h2>
      <form onSubmit={isNewAccount ? handleNewAccount : isForgotPassword ? handleForgotPassword : handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          disabled={isForgotPassword}
        />
        <button type="submit">{isNewAccount ? 'Create Account' : isForgotPassword ? 'Reset Password' : 'Login'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {!isNewAccount && !isForgotPassword && (
        <div>
          <p>
            <button onClick={() => setIsNewAccount(true)}>Create New Account</button>
          </p>
          <p>
            <button onClick={() => setIsForgotPassword(true)}>Forgot Password</button>
          </p>
        </div>
      )}
      {(isNewAccount || isForgotPassword) && (
        <button onClick={() => { setIsNewAccount(false); setIsForgotPassword(false); }}>Back to Login</button>
      )}
      <button onClick={() => setShowAccounts(!showAccounts)}>{showAccounts ? 'Hide Accounts' : 'Show Accounts'}</button>
      {showAccounts && (
        <div>
          <h3>Existing Accounts</h3>
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>Username: {account.username}, Password: {account.password}</li>
            ))}
          </ul>
          <h3>Delete Account</h3>
          <form onSubmit={handleDeleteAccount}>
            <input 
              type="text" 
              placeholder="Username" 
              value={deleteUsername} 
              onChange={(e) => setDeleteUsername(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={deletePassword} 
              onChange={(e) => setDeletePassword(e.target.value)} 
            />
            <button type="submit">Delete Account</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
