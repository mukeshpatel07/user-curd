import React, { useEffect, useState } from "react";
import { createUser, updateUser, getUserById } from "../api";

export default function UserForm({ users, setUsers, userId, onSaved }) {
  // Determine if we are editing an existing user
  const isEdit = Boolean(userId);

  // Form state
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // Loading and error states
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  // Load existing user data when editing
  useEffect(() => {
    if (isEdit) {
      getUserById(userId)
        .then(res => {
          setForm(res.data); // pre-fill form with existing user data
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load user details.");
          setLoading(false);
        });
    }
  }, [userId, isEdit]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEdit ? updateUser(userId, form) : createUser(form);

    action
      .then(res => {
        const returnedUser = res.data;

        // Notify parent component to update the users list
        onSaved(returnedUser, isEdit ? "update" : "create");

        // Optional alert
        alert(isEdit ? "User updated successfully!" : "User created successfully!");
      })
      .catch(() => alert("Something went wrong!"));
  };

  // Display loading state
  if (loading) return <div className="alert alert-info">Loading user details...</div>;

  // Display error state
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      {/* Email input */}
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      {/* Phone input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />

      {/* Submit button */}
      <button type="submit" className="btn btn-primary w-100">
        {isEdit ? "Update User" : "Create User"}
      </button>
    </form>
  );
}
