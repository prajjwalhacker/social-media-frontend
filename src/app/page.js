"use client"
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
           <div className="login-title">
             Signup in Social media Fuzzbook
           </div>
           <div className="form-row">
             <div>
                Email
             </div>
             <input className="custom-input" type='text' value={formData.email || ''} name='email' onChange={(e) => {
                 setFormData((val) => ({ ...val,email: e.target.value }));
             }}/>
           </div>
           <div className="form-row">
             <div>
                Name
             </div>
             <input className="custom-input" type='text' value={formData.name || ''} name='username' onChange={(e) => {
                setFormData((val) => ({ ...val, name: e.target.value }))
             }}/>
           </div>
           <div className="form-row">
             <div>
                Password
             </div>
             <input className='custom-input' type='text' value={formData.password || ''} name='password' onChange={(e) => {
                setFormData((val) => ({ ...val, password: e.target.value }));
             }}/> 
           </div>
           <button className="custom-button" onClick={() => { onLoginSubmit() }}>
              Submit 
           </button>
        </div>
    </div>
  );
}
