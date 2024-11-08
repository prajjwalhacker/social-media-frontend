"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
const Navbar = ({ navigations }) => {

    const router = useRouter();

    const onLogout = async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/logout', {}, {
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
                return (
                    <div key={index} onClick={() => { if(item.name === 'logout') {
                         onLogout();
                    } 
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