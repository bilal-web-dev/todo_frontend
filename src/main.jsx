import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createContext } from "react";

export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

export const server = "https://todo-app-backend-umber.vercel.app";
