import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
      );
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  const handleFormSubmit = (newUser) => {
    if (newUser.id) {
      setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
    } else {
      const maxId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
      newUser.id = maxId + 1;
      setUsers([...users, newUser]);
    }
    setCurrentUser(null);
  };
  

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

      <UserForm
        currentUser={currentUser}
        onFormSubmit={handleFormSubmit}
        onCancel={() => setCurrentUser(null)}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default UserList;
