import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    dateOfBirth: "",
    ssn: "",
    accountType: "savings",
    password: "",
  });
  //users url
  const userUrl = "http://localhost:4000/users";

  //accounts url
  const accountUrl = "http://localhost:4005/accounts";

  let navigate = useNavigate();

  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (e.target.name === "password") {
      // Validate the password using a regular expression
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      const isValid = passwordRegex.test(value);
      setIsPasswordValid(isValid);
      console.log(isValid);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      // Display an error message for the invalid password
      alert("Invalid password");
      return;
    }

    const res = await axios.post(userUrl, user);
    console.log(res.data.id);

    createAccount(res.data.id);
    navigate("/login");
  };

  //creating Account
  const createAccount = async (id) => {
    const accountInfo = {
      accountNumber: generateUniqueAccountNumber(),
      accountType: user.accountType,
      userId: id,
      balance: 0, // Initial balance
      transactionHistory: [], // Initial transaction history
    };

    await axios.post(accountUrl, accountInfo);
  };

  //Generating a random account number
  function generateUniqueAccountNumber() {
    let x = Math.floor(Math.random() * 100000000000 + 1);
    return x;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center text-primary">Register Users</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="tel"
                className="form-control"
                name="contactNumber"
                value={user.contactNumber}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                name="address"
                value={user.address}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ssn" className="form-label">
                Social Security Number (or equivalent)
              </label>
              <input
                type="text"
                className="form-control"
                name="ssn"
                value={user.ssn}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="accountType" className="form-label">
                Account Type
              </label>
              <select
                name="accountType"
                value={user.accountType}
                onChange={(e) => handleChange(e)}
                className="form-control"
                required
              >
                <option value="savings">Savings</option>
                <option value="checking">Checking</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                required
              />
              {!isPasswordValid && (
                <div className="text-danger">
                  Password must be at least 8 characters and contain at least
                  one letter and one digit.
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
