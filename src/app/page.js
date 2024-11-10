"use client"
import axios from "axios";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

export default function Home() {

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();




  const validateData =  () => {
    
   const { email, name, password } = formData || {};

   const errorObj = {};
   if (!email) {
      errorObj.email = 'Email is required';
   }
   if (!name) {
      errorObj.name = 'Name is required';
   }
   if (!password) {
      errorObj.password = 'Password is required';
   }

   return errorObj;
  }

  const handleNavigation = () => {
   setLoading(true); // Show the loader
   router.push('/login').then(() => setLoading(false)); // Hide the loader after navigation
 };


  const onLoginSubmit = async () => {
      const { email, name, password } = formData || {};

      const errorObj = validateData();
      console.log("errorObj");
      console.log(errorObj);
      setErrors(errorObj);

      if (Object.keys(errorObj).length) {
         return;
      }
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`,{
          email, username: name, password
        },{ withCredentials: true });

        if (response?.data?._id) {
           toast.success("You are registered successfully 🎉", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          handleNavigation();
        }

      }
      catch (err) {
         console.log(err, "error");
      }
      finally {
         setLoading(false);
      }
   
  }

  useEffect(() => {
      const { email,  name,  password } = formData || {};

      const newErrorObj = JSON.parse(JSON.stringify(errors));
      if (email) {
         delete newErrorObj.email;
      }
      if (name) {
         delete newErrorObj.name;
      }
      if (password) {
         delete newErrorObj.password;
      }

      setErrors(newErrorObj);

  }, [formData]);



  useEffect(() => {
   
  }, [])


  return (
    <div className="main-container">
        <div className="login-container">
           <div className="login-title">
           "Be Part of the Connectly Community – Sign Up Now!
           </div>
           <div className="form-row">
             <input className="custom-input" type='text' value={formData.email || ''} name='email' placeholder='Email..' onChange={(e) => {
                 setFormData((val) => ({ ...val,email: e.target.value }));
             }}/>
             {
               !!errors?.email && <div className="error-state">{errors?.email || ''}</div>
             }
           </div>
           <div className="form-row">
             <input className="custom-input" type='text' value={formData.name || ''} name='username' placeholder='Name..' onChange={(e) => {
                setFormData((val) => ({ ...val, name: e.target.value }))
             }}/>
             {
               !!errors?.name && <div className="error-state">{errors?.name}</div>
             }
           </div>
           <div className="form-row">
             <input className='custom-input' type='password' value={formData.password || ''} name='password' placeholder='Password' onChange={(e) => {
                setFormData((val) => ({ ...val, password: e.target.value }));
             }}/> 
             {
               !!errors?.password && <div className="error-state">{errors?.password}</div>
             }
           </div>
           <button className="custom-button" onClick={() => { onLoginSubmit() }}>
              {loading ? <Oval height={20} width={20} color="#ffffff" /> : 'Signup' }
           </button>
        </div>
    </div>
  );
}
