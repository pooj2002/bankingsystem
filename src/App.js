import './App.css';
import"../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transaction from './Transaction'; // Assuming your component file name is Transaction.js

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Transaction />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
