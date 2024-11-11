"use client"
import '../../styles/global.scss';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

export default function RootLayout({ children }) {

  const navigations = [
    {
      name: "logout",
      title: "Logout",
      path: "/login"
    },
    {
      name: "signup",
      title: "signup",
      path: "/"
    },
    {
      name:"login",
      title: "Login",
      path: "/login"
    }
  ]

  return (
    <html lang="en">
      <body>
      <Provider store={store}>
        <Navbar navigations={navigations}/>
          {children}
          <Footer/>
        </Provider>
        <ToastContainer/>
      </body>
    </html>
  );
}
