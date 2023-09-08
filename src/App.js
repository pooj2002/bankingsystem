import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Transaction from './Transaction'; // Assuming your component file name is Transaction.js

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
    {/* <Route path="/" element={<div>Home</div>} />*/}
          <Route path="/register" element={<RegisterPage />} />
          {/*Should add login component*/}

          <Route path="/login" element={<LoginPage />} />
          {/*Should add dashboard component*/}
          <Route path="/dashboard" element={<Dashboard id="9"></Dashboard>} />
          <Route path="/" element={<Transaction />} />

        </Routes>
      </Router>
    </div>
  );

}

export default App;
