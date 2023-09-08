import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Withdraw(props) {
  const [bal, setBal] = React.useState(0);
  const [account, setAccount] = React.useState(null);

  let navigate = useNavigate();
  const onInputChange = (e) => {
    const amount = parseFloat(e.target.value);
    console.log(amount);
    setBal(amount);
  };

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4005/accounts?userId=" + props.id
      );
      setAccount(response.data[0]);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
    console.log(account);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    var afterWithdraw = account.balance - bal;

    const msg = `Withdrawal of ${bal} successful`;
    var transactionArray = account;
    transactionArray.transactionHistory.push(msg);

    try {
      const result = await axios
        .patch(`http://localhost:4005/accounts/${account.id}`, {
          balance: afterWithdraw,
          transactionHistory: transactionArray.transactionHistory,
        })
        .then((response) => {
          console.log("PATCH successful:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(result);

      // Clear the input field after successful deposit
      setBal(0);
    } catch (error) {
      console.error("Error during deposit:", error);
    }
    alert("Withdrawal successful");
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center text-primary">Withdrawal</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Amount" className="form-label">
                Amount
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter amount"
                name="amount"
                value={bal}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
