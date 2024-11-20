import React from "react";
import UserList from "./components/Userlist";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">User Management Dashboard</h1>
      <UserList />
    </div>
  );
};

export default App;
