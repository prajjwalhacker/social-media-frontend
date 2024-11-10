"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../feature/userProfileSlice';
import { toast } from 'react-toastify'


 const Login = () => {




    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});


    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userProfile);
    
    console.log(userState, "profile");

    const router = useRouter();

    const validateForm = () => {
      const { email, password } = formData || {};

      const errorObj = {};
      if (!email) {
          errorObj.email = 'This is required';
      }
      if (!password) {
         errorObj.password = 'This is required';
      }
      return errorObj;
    }

    const onsubmit = async () => {

        const { email, password } = formData || {};

        const errorObj = validateForm();

        setErrors(errorObj);

        if (Object.keys(errorObj).length) {
           return;
        }


        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
              email,
              password
            }, { withCredentials: true });
            if (response?.data?.newUser?._id) {
               dispatch(fetchProfile());
               toast.success("Login successfully !");
               router.push(`/dashboard/${response?.data?.newUser?._id}`);
            }
        }
        catch (err) {
            console.log(err, "error");
        }
    }

    useEffect(() => {
       const errorObj = JSON.parse(JSON.stringify(errors));
       if (formData.email) {
         delete errorObj.email;
       }
       if (formData.password) {
         delete errorObj.password;
       }
       setErrors(errorObj);
    }, [formData]);


    return (
        <div className="main-container">
        <div className="login-container">
           <div className="login-title">
              Login in Fuzzbook
           </div>
           <div className="form-row">
           <div>
              <input className="custom-input" type="text" value={formData?.email || ''} placeholder="Email.." name='email' onChange={(e) => {
                 setFormData((val) => ({ ...val, email: e.target.value }))
              }}/>
               {
               !!errors?.email && <div className="error-state">{errors?.email || ''}</div>
             }
           </div>
           <input className="custom-input" type='password' value={formData?.password || ''} placeholder='Password..' name='password' onChange={(e) => {
              setFormData((val) => ({ ...val, password: e.target.value }));
           }}/>
             {
               !!errors?.password && <div className="error-state">{errors?.password || ''}</div>
             }
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