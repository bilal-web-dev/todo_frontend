import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { Context, server } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});

  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users/me`, {
        withCredentials: true,
      });

      setUser(data.user);
    } catch (error) {}
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "70px",
        color: "rgb(157, 29, 208)",
      }}
    >
      <h1 style={{ marginBottom: "50px" }}>Your Profile</h1>
      <h2>Name: </h2>{" "}
      <p
        style={{
          marginTop: "5px",
          marginBottom: "10px",
          fontSize: "20px",
        }}
      >
        {user.name}
      </p>
      <h2>Email: </h2>{" "}
      <p
        style={{
          marginTop: "5px",
          marginBottom: "10px",
          fontSize: "20px",
        }}
      >
        {user.email}
      </p>
    </div>
  );
};

export default Profile;
