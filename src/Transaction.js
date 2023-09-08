import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Transaction() {
    let navigate = useNavigate();

    const [transaction, setTransaction] = useState({
        sender: "",
        receiver: "",
        amount: 0,
    });

    const { sender, receiver, amount } = transaction;

    const onInputChange = (e) => {
        setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (parseFloat(amount) <= 0) {
            alert('Amount must be greater than 0');
            return;
        }

        // Here, you can implement your logic for handling the transaction.
        // For this example, we'll just display the transaction details.
        console.log(`Transaction Details:
        Sender: ${sender}
        Receiver: ${receiver}
        Amount: ${amount}`);

        // You can also make an API request to perform the actual transaction
        try {
            // Assuming you have a different endpoint for deposit/withdraw
            await axios.post("http://localhost:4000/transaction", transaction);
            console.log("Transaction successful!");
        } catch (error) {
            console.error("Transaction failed:", error);
        }

        // Clear the form fields after processing the transaction
        setTransaction({
            sender: "",
            receiver: "",
            amount: 0,
        });

        navigate("/");
    };

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className="text-center text-primary">Make a Transaction</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Sender' className='form-label'>Sender</label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter sender'
                                name="sender"
                                value={sender}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Receiver' className='form-label'>Receiver</label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Enter receiver'
                                name="receiver"
                                value={receiver}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Amount' className='form-label'>Amount</label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='Enter amount'
                                name="amount"
                                value={amount}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-danger mx-2' to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
