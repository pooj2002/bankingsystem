import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactDOM from "react-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUsers] = useState([]);
  const [account, setAccount] = useState([]);
  const [data, setData] = useState(null);
  const id = sessionStorage.getItem("id");
  let navigate = useNavigate();
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/users?id=" + id);
    setData(result.data);
    const root = ReactDOM.createRoot(document.getElementById("namediv"));
    const ele = (
      <h3 style={{ marginTop: "20px" }} class="display-6">
        Hello, {result.data[0].name}
      </h3>
    );
    root.render(ele);
  };

  const handleTransHistoryClick = async () => {
    try {
      const account = await axios.get(
        "http://localhost:4005/accounts?userId=" + id
      );
      setAccount(account);
      //console.log(account);
      const root = ReactDOM.createRoot(document.getElementById("myData"));
      root.render(<p></p>);
      console.log(account);
      const element = (
        <div className="container" style={{ textAlign: "left" }}>
          <h2>Transaction History</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {account.data[0].transactionHistory.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      root.render(element);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleAccDetailsClick = async () => {
    try {
      const user = await axios.get("http://localhost:4000/users?id=" + id);
      setData(user);
      const account = await axios.get(
        "http://localhost:4005/accounts?userId=" + id
      );
      setAccount(account);
      const root = ReactDOM.createRoot(document.getElementById("myData"));

      const element = (
        <div class="container" style={{ textAlign: "left" }}>
          <h4>Name: {user.data[0].name}</h4>
          <h4>Account Number: {account.data[0].accountNumber}</h4>
          <h4>Account Type: {user.data[0].accountType}</h4>
          <h4>Current Balance: {account.data[0].balance}</h4>
        </div>
      );
      root.render(element);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem("id");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <>
      <div className="py-4">
        <header class="py-3 text-bg-dark">
          <div class="container d-flex flex-wrap justify-content-center">
            <a
              href="#"
              class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
            >
              {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
              <span class="fs-4  text-white">
                Bank account registration system
              </span>
            </a>
          </div>
        </header>

        <div class="container">
          <div class="row">
            <div class="col-6">
              <div id="namediv" style={{ float: "left" }}></div>
            </div>
            <div class="col-6"></div>
          </div>
          <hr></hr>
          <div style={{ float: "left" }}>
            <button
              style={{ width: "250px", marginRight: "5px" }}
              type="button"
              onClick={handleAccDetailsClick}
              class="btn btn-dark"
            >
              Account Details
            </button>
            <button
              style={{ width: "250px", marginRight: "5px" }}
              type="button"
              class="btn btn-dark"
              onClick={handleTransHistoryClick}
            >
              Transaction history
            </button>
            <Link
              style={{ width: "250px", marginRight: "5px" }}
              type="button"
              class="btn btn-dark"
              to="/dashboard/deposit"
            >
              deposit
            </Link>
            <Link
              style={{ width: "250px", marginRight: "5px" }}
              type="button"
              class="btn btn-dark"
              to="/dashboard/withdraw"
            >
              Withdraw
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="container">
        <hr></hr>
        <div id="myData" class="container"></div>

        {
          //  <tbody id="myTable" style={{textAlign:"left"}}>
          //    {
          //       users.map((user,index)=>(<h4>Name: {user.name}</h4>))
          //    }
          //    {
          //       accounts.map((account,index)=>(<h4 key={index}>Account Number: {account.accountNumber}</h4>))
          //    }
          //    {
          //       users.map((user,index)=>(<h4 key={index}>Account Type: {user.accountType}</h4>))
          //    }
          //    {
          //       accounts.map((account,index)=>(<h4 key={index}>Current Balance: {account.balance}</h4>))
          //    }
          //  </tbody>
        }
      </div>
      <footer class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
        <div class="container">
          <span class=" text-white">
            Neha Sarnaik | Pooja S | Saatvik Sangwan | Monika Sharma
          </span>
        </div>
      </footer>
    </>
  );
}
