import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import { toast } from "react-hot-toast";
import { server, Context } from "../main";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/api/users/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <h2
        style={{ margin: "50px", fontSize: "40px", fontFamily: "Caveat Brush" }}
      >
        Register
      </h2>

      <form className="form" onSubmit={registerHandler}>
        <input
          className="input"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter your name"
          name="name"
        />{" "}
        <br />
        <input
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
          name="email"
        />{" "}
        <br />
        <input
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter your password"
          name="password"
        />{" "}
        <br />
        <button className="btn" type="submit">
          Register
        </button>{" "}
        <br />
        <p className="p">
          Already Have an account? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
