import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import { toast } from "react-hot-toast";
import { server, Context } from "../main";
import Loader from "./Loader";

const login = () => {
  const [isLoading, setIsLoading] = useState();

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/api/users/login`,
        {
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
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <h2
        style={{ margin: "50px", fontSize: "40px", fontFamily: "Caveat Brush" }}
      >
        Login
      </h2>

      <form className="form" onSubmit={loginHandler}>
        <input
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
          type="email"
          placeholder="Enter your email"
          name="email"
        />{" "}
        <br />
        <input
          className="input"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter your password"
          name="password"
        />{" "}
        <br />
        <button className="btn" type="submit">
          Login
        </button>{" "}
        <br />
        <h2 className="h2">Or</h2>
        <Link to={"/register"}>
          {" "}
          <h1
            style={{
              margin: "50px",
              fontSize: "40px",
              fontFamily: "Caveat Brush",
            }}
          >
            Signup
          </h1>{" "}
        </Link>
      </form>
    </div>
  );
};

export default login;
