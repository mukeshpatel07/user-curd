import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { getUsers } from "../api";

export default function Home() {
  // State for storing users
  const [users, setUsers] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null); // null means create, otherwise edit

  // Load users initially
  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  // Open modal to create new user
  const openCreateModal = () => {
    setEditUserId(null);
    setShowModal(true);
  };

  // Open modal to edit existing user
  const openEditModal = (id) => {
    setEditUserId(id);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Callback after create/update to refresh user list
  const handleUserSaved = (newUser, type) => {
    setUsers(prev => {
      if (type === "update") {
        return prev.map(u => (u.id === newUser.id ? newUser : u));
      } else {
        return [...prev, newUser];
      }
    });
    closeModal();
  };

  return (
    <div className="container mt-4">

      {/* Hero / Dashboard Header */}
      <div className="p-4 mb-4 bg-dark text-white rounded shadow-sm">
        <h2 className="fw-bold">User Management Dashboard</h2>
        <p className="mb-2">
          Manage users, view details, update information, and keep your records organized.
        </p>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Create New User
        </button>
      </div>

      {/* Stats Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Users</h6>
              <h3 className="fw-bold">{users.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Active Users</h6>
              <h3 className="fw-bold text-success">...</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Inactive Users</h6>
              <h3 className="fw-bold text-danger">...</h3>
            </div>
          </div>
        </div>
      </div>

      {/* User List Component */}
      <UserList users={users} setUsers={setUsers} onEdit={openEditModal} />

      {/* Modal for Create/Edit User */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,1)", // solid black background
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                backgroundColor: "#fff", // pure white modal
                boxShadow: "none",        // remove shadow
                borderRadius: "0.5rem",   // optional rounded corners
              }}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {editUserId ? "Edit User" : "Create User"}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <UserForm
                  users={users}
                  setUsers={setUsers}
                  userId={editUserId}
                  onSaved={handleUserSaved}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
