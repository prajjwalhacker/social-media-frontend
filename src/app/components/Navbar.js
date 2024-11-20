"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../layout";
const Navbar = ({ navigations }) => {

    const router = useRouter();

    const state = useSelector((state) => state);

    const contextObj = useContext(AuthContext);


    console.log("ContextObj");
    console.log(contextObj);

    const onLogout = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {}, {
            withCredentials: true
          });
        }
        catch (err) {

        }
    }
    
    if (!navigations?.length) {
        return;
    }

    return (
        <div className="main-navbar">
          {
            navigations.map((item, index) => {
                if (!item.show) return;
                return (
                    <div  className='navbar-element' key={index} onClick={() => { if(item.name === 'logout') {
                         onLogout();
                    } 
                    item?.postAction();
                    router.push(item.path) 
                    }}>
                        {item.title}
                    </div>  
                )
            })
          }
      </div>
    )
}

export default Navbar;