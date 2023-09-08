import React, { useState,useEffect } from "react";
import axios from "axios";

export default function Dashboard(props) {
   
    const [users,setUsers]=useState([]);
    const [accounts,setAccount]=useState([]);
    let id;
    useEffect(()=>{
       loadUsers();
       loadAccounts();
    },[]);
    const loadUsers=async()=>{
       const result= await axios.get("http://localhost:4000/users?id="+props.id)
       setUsers(result.data);
    }

    const loadAccounts=async()=>{
        const acc= await axios.get("http://localhost:4005/accounts?userId="+props.id)
        setAccount(acc.data);
     }
     
   return(
       <>
<div className = 'py-4'>


    <header class="py-3 text-bg-dark">
      <div class="container d-flex flex-wrap justify-content-center">
        <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
          {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
          <span class="fs-4  text-white">Bank account registration system</span>
        </a>
      </div>
    </header>
    
    <div class="container">
      <div class="row">
         <div class="col-6">
            <div style={{float:"left"}}>
               {
                  users.map((user,index)=>(
               <h3 class="display-3" key={index}>Hello, {user.name}</h3>
                  ))
               }
            </div>
         </div>
         <div class="col-6">
            
         </div>
      </div>
      <hr></hr>
      <div style={{float:"left"}}>
         <button style={{width:"250px",marginRight:"5px"}}type="button" class="btn btn-dark">Account Details</button>
         <button style={{width:"250px",marginRight:"5px"}}type="button" class="btn btn-dark">Transaction history</button>
         <button style={{width:"250px",marginRight:"5px"}}type="button" class="btn btn-dark">Add transaction</button>

      </div>
  </div>
</div>
<div class="container">
   
<hr></hr>

{
 <tbody id="myTable" style={{textAlign:"left"}}>
   {
      users.map((user,index)=>(<h4>Name: {user.name}</h4>))
   }
   {
      accounts.map((account,index)=>(<h4 key={index}>Account Number: {account.accountNumber}</h4>))
   }
   {
      users.map((user,index)=>(<h4 key={index}>Account Type: {user.accountType}</h4>))
   }
   {
      accounts.map((account,index)=>(<h4 key={index}>Current Balance: {account.balance}</h4>))
   }
 </tbody> 
}
</div>
<footer  class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
   <div class="container">
      <span class=" text-white">Neha Sarnaik | Pooja S | Saatvik Sangwan | Monika Sharma</span>
   </div>
</footer>
</>
   )
}
