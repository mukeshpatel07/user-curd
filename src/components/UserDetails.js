import React, { useEffect, useState } from "react";
import { getUserById } from "../api";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">User Profile</h2>
        <Link className="btn btn-outline-primary" to="/">
          ← Back to Users
        </Link>
      </div>

      {/* Card */}
      <div className="card shadow-lg border-0 p-4">
        <div className="d-flex flex-column flex-md-row align-items-center">
          
          {/* Avatar */}
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="profile"
            className="rounded-circle border border-3 shadow-sm"
            width="140"
            height="140"
          />

          {/* User Info */}
          <div className="ms-md-4 mt-3 mt-md-0 w-100">
            <h3 className="fw-bold">{user.name}</h3>
            <p className="text-muted mb-2">User ID: {id}</p>

            <hr />

            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                <strong>Email:</strong> {user.email}
              </li>

              <li className="list-group-item px-0">
                <i className="bi bi-telephone-fill me-2 text-success"></i>
                <strong>Phone:</strong> {user.phone}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
