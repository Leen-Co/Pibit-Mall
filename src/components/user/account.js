import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <h4 className="center-align">Dashboard</h4>
        {user ? (
          <>
            <p>Welcome {user.name}!</p>
            <p>Your email is {user.email}</p>
            <p>Your Pi Network wallet address is {user.pi_wallet}</p>
          </>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
