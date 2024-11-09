"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../feature/userProfileSlice';


 const Login = () => {




    const [formData, setFormData] = useState({});


    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userProfile);
    
    console.log(userState, "profile");

    const router = useRouter();

    const onsubmit = async () => {

        const { email, password } = formData || {};


        try {
            const response = await axios.post('http://localhost:8080/api/login', {
              email,
              password
            }, { withCredentials: true });
            if (response?.data?.newUser?._id) {
               dispatch(fetchProfile());
               router.push(`/dashboard/${response?.data?.newUser?._id}`);
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
              Login in Fuzzbook
           </div>
           <div className="form-row">
           <div>
             Email 
           </div>
           <div>
              <input className="custom-input" type="text" value={formData?.email || ''} name='email' onChange={(e) => {
                 setFormData((val) => ({ ...val, email: e.target.value }))
              }}/>
           </div>
           <div className="form-row">
              Password
           </div>
           <input className="custom-input" type='text' value={formData?.password || ''} name='password' onChange={(e) => {
              setFormData((val) => ({ ...val, password: e.target.value }));
           }}/>
           </div>
           <button className="custom-button" onClick={() => {
              onsubmit();
           }}>
              Submit
           </button>
        </div>
        </div>
    )
}

export default Login;