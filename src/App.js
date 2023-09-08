import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";

function App() {
  const id = sessionStorage.getItem("id");
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<div>Home</div>} />*/}
          <Route path="/register" element={<RegisterPage />} />
          {/*Should add login component*/}

          <Route path="/login" element={<LoginPage />} />
          {/*Should add dashboard component*/}
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/dashboard/deposit" element={<Deposit />} />
          <Route path="/dashboard/withdraw" element={<Withdraw />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
