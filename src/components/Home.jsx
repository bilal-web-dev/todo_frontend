import React, { useContext, useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Loader from "./Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/api/task/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/api/task/update/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/task/create`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(`${server}/api/task/all`, {
        withCredentials: true,
      });

      setTask(data.tasks);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  });

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="home-main">
      <form className="h-form" onSubmit={addTaskHandler}>
        <input
          className="input"
          value={title}
          type="text"
          placeholder="Enter your title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />{" "}
        <br />
        <input
          className="input"
          value={description}
          type="text"
          placeholder="Enter Task Description"
          name="title"
          onChange={(e) => setDescription(e.target.value)}
          required
        />{" "}
        <br />
        <button className="btn" type="submit">
          Add Task
        </button>
        <br />
      </form>
      <h1 className="h1">Your Tasks</h1>
      {task.map((i) => (
        <TaskCard
          key={i._id}
          id={i._id}
          updateHandler={updateHandler}
          title={i.title}
          description={i.description}
          isCompleted={i.isCompleted}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export const TaskCard = ({
  title,
  description,
  id,
  updateHandler,
  isCompleted,
  deleteHandler,
}) => (
  <div className="taskCard">
    <h3>{title}</h3>
    <p>{description}</p>
    <input
      checked={isCompleted}
      onChange={() => {
        updateHandler(id);
      }}
      type="checkbox"
    />
    <AiFillDelete
      className="icon"
      size={28}
      color="red"
      onClick={() => deleteHandler(id)}
    />
  </div>
);

export default Home;
