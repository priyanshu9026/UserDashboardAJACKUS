import React, { useState, useEffect } from "react";

const UserForm = ({ currentUser, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill all fields.");
      return;
    }
    onFormSubmit(formData);
    setFormData({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{currentUser ? "Edit User" : "Add User"}</h4>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        {currentUser ? "Update" : "Add"}
      </button>
      {currentUser && (
        <button className="btn btn-secondary ms-2" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
