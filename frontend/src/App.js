import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddComputer from "./components/add-computer.component";
import Computer from "./components/computer.component";
import ComputersList from "./components/computers-list.component";

import EmployeesList from "./components/employee/employee-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/employees"} className="navbar-brand">
            AssetMe
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/computers"} className="nav-link">
                Computers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<EmployeesList />} />
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/computers" element={<ComputersList />} />
            <Route path="/add" element={<AddComputer />} />
            <Route path="/computers/:id" element={<Computer />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
