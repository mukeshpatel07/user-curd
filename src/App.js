import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Only import what is needed
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <>
      {/* Top navigation bar */}
      <Navbar />

      {/* Main content */}
      <main>
        <div className="container mt-4">
          <Routes>
            {/* Home page with nested routes for creating/editing users */}
            <Route path="/" element={<Home />}>
              <Route path="create" element={<UserForm />} />     {/* Create User form */}
              <Route path="edit/:id" element={<UserForm />} />  {/* Edit User form */}
            </Route>

            {/* Separate route for viewing a single user's details */}
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
