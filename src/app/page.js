"use client"
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [formData, setFormData] = useState({});


  console.log("FormData");
  console.log(formData);


  const onLoginSubmit = async () => {
      const { email, username, password } = formData || {};

      console.log(formData);
      
      try {
        const res = await axios.post(`http://localhost:8080/api/signup`, {
          email,
          username,
          password
        });

        console.log(res, "response");

      }
      catch (err) {
         console.log(err, "error");
      }
   
  }

  return (
    <div className="main-container">
        <div className="main-navbar">
          <div>
             Signup
          </div>
          <div>
            Login
          </div>
          <div>
            Logout
          </div>
        </div>
        <div className="login-container">
           <div>
             Login in Social media Fuzzbook
           </div>
           <div>
             <div>
                Email
             </div>
             <input type='text' value={formData.email || ''} name='email' onChange={(e) => {
                 setFormData((val) => ({ ...val,email: e.target.value }));
             }}/>
           </div>
           <div>
             <div>
                Name
             </div>
             <input type='text' value={formData.name || ''} name='username' onChange={(e) => {
                setFormData((val) => ({ ...val, name: e.target.value }))
             }}/>
           </div>
           <div>
             <div>
                Password
             </div>
             <input type='text' value={formData.password || ''} name='password' onChange={(e) => {
                setFormData((val) => ({ ...val, password: e.target.value }));
             }}/> 
           </div>
           <button onClick={() => { onLoginSubmit() }}>
              Submit 
           </button>
        </div>
    </div>
  );
}
