import React, { useState } from "react";
import { deleteUser } from "../api";
import { motion } from "framer-motion";
import UserForm from "./UserForm";
import { Link } from "react-router-dom";

export default function UserList({ users, setUsers }) {
  // Local states
  const [search, setSearch] = useState("");         // Search input
  const [sortField, setSortField] = useState("name"); // Sorting field
  const [sortOrder, setSortOrder] = useState("asc");  // Sorting order
  const [currentPage, setCurrentPage] = useState(1);  // Current pagination page
  const [editUserId, setEditUserId] = useState(null); // Currently edited user ID

  const usersPerPage = 7; // Number of users per page

  // Generate a random avatar URL based on user ID
  const avatar = (id) => `https://api.dicebear.com/7.x/avataaars/svg?seed=User${id}`;

  // Filter users based on search input
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort users based on selected field and order
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const A = a[sortField].toLowerCase();
    const B = b[sortField].toLowerCase();
    return sortOrder === "asc" ? (A > B ? 1 : -1) : (A < B ? 1 : -1);
  });

  // Pagination calculations
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = sortedUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Change sort field/order when header clicked
  const changeSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Delete a user
  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;

    deleteUser(id).then(() => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (editUserId === id) setEditUserId(null); // Reset form if deleting the edited user
    });
  };

  // Handle form save (update or create)
  const handleUserSaved = (user, type) => {
    if (type === "update") {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers((prev) => [...prev, user]);
    }
    setEditUserId(null); // Hide form after save
  };

  return (
    <>
      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
        />
      </div>

      {/* Users table */}
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="table table-hover align-middle shadow-sm rounded"
      >
        <thead className="table-dark">
          <tr>
            <th>Avatar</th>
            <th style={{ cursor: "pointer" }} onClick={() => changeSort("name")}>
              Name {sortField === "name" && <i className={`bi bi-sort-alpha-${sortOrder}`}></i>}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => changeSort("email")}>
              Email {sortField === "email" && <i className={`bi bi-sort-alpha-${sortOrder}`}></i>}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => changeSort("phone")}>
              Phone {sortField === "phone" && <i className={`bi bi-sort-numeric-${sortOrder}`}></i>}
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((u) => (
            <motion.tr
              key={u.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <td>
                <img
                  src={avatar(u.id)}
                  alt=""
                  width="45"
                  height="45"
                  className="rounded-circle border shadow-sm"
                />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                {/* View user details */}
                <Link to={`/user/${u.id}`} className="btn btn-sm btn-info me-2 text-white">
                  View
                </Link>

                {/* Edit user inline */}
                <button className="btn btn-sm btn-warning me-2" onClick={() => setEditUserId(u.id)}>
                  Edit
                </button>

                {/* Delete user */}
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-3">
        <ul className="pagination shadow-sm">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
            <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
              Next
            </button>
          </li>
        </ul>
      </div>

      {/* Inline edit form below table */}
      {editUserId && (
        <div className="card p-4 mb-4 border mt-4">
          <h5 className="fw-bold">Edit User</h5>
          <UserForm
            users={users}
            setUsers={setUsers}
            userId={editUserId}
            onSaved={handleUserSaved}
          />
        </div>
      )}
    </>
  );
}
