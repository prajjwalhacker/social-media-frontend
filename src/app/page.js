"use client"
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function Home() {

  const [formData, setFormData] = useState({});

  const router = useRouter();


  console.log("FormData");
  console.log(formData);


  const onLoginSubmit = async () => {
      const { email, name, password } = formData || {};

      console.log(formData);
      
      try {
        const response = await axios.post('http://localhost:8080/api/signup',{
          email, username: name, password
        },{ withCredentials: true });

        if (response?.data?._id) {
           router.push('/login');
        }

      }
      catch (err) {
         console.log(err, "error");
      }
   
  }

  return (
    <div className="main-container">
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
