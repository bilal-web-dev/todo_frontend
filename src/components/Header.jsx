import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { server, Context } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BiLogOut, BiSolidUser, BiSolidHomeAlt2 } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const customToast = () => {
    if (!isAuthenticated) {
      toast.error("Please Login First");
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/api/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("Unable to Logout");
    }
  };

  return (
    <div className="main">
      <div className="logo">TODOO</div>
      <div className="links">
        <Link onClick={customToast} to={"/"}>
          {" "}
          <BiSolidHomeAlt2 size={25} color="white" />{" "}
        </Link>
        <Link onClick={customToast} to={"/profile"}>
          {" "}
          <BiSolidUser size={25} color="white" />{" "}
        </Link>

        {isAuthenticated ? (
          <BiLogOut
            size={25}
            color="white"
            style={{ cursor: "pointer" }}
            onClick={logoutHandler}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
