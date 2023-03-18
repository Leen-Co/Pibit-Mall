import React, { useState } from 'react';
import axios from 'axios';

const Register = ({history}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [piWallet, setPiWallet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        piWallet
      });
      if (response.status === 201) {
        history.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              type="text"
              className="validate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field col s12">
            <input
              id="piWallet"
              type="text"
              className="validate"
              value={piWallet}
              onChange={(e) => setPiWallet(e.target.value)}
            />
            <label htmlFor="piWallet">Pi Wallet Address</label>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
