import { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfileForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [piWallet, setPiWallet] = useState(user.pi_wallet);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/user/${user.id}`, {
        name,
        email,
        pi_wallet: piWallet,
      });
      console.log(response.data);
      // redirect to updated dashboard
    } catch (error) {
      console.log(error);
      // display error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Pi Wallet:
        <input type="text" value={piWallet} onChange={(e) => setPiWallet(e.target.value)} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProfileForm;
