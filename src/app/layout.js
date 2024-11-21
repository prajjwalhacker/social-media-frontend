"use client"
import '../../styles/global.scss';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import { useState } from 'react';
 

import { createContext, useContext } from 'react';

export const AuthContext = createContext({});

export default function RootLayout({ children }) {


  const [isLoggedIn, setIsLoggedIn] = useState(false);


   const login = () => {
      setIsLoggedIn(true);
   }

   const logout = () => {
    setIsLoggedIn(false);
   }


  const navigations = [
    {
      name: "logout",
      title: "Logout",
      path: "/login",
      show: isLoggedIn,
      postAction: logout
    },
    {
      name: "Signup",
      title: "Signup",
      show: !isLoggedIn,
      path: "/",
      postAction: () => {},
    },
    {
      name:"login",
      title: "Login",
      path: "/login",
      show: !isLoggedIn,
      postAction: () => {}
    }
  ]

  return (
    <html lang="en">
      <body>
      <Provider store={store}>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <Navbar navigations={navigations}/>
          {children}
          <Footer/>
      </AuthContext.Provider>
      </Provider>
        <ToastContainer/>
      </body>
    </html>
  );
}
