"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const Dashboard = () => {

    const [profileData, setProfileData] = useState({});
    const [postMessage, setPostMessage] = useState('');
    const [postList, setPostList] = useState([]);
    const [peoplesVisited, setPeopleVisited]= useState([]);
    const [totalVisits,setTotalVisits] = useState(0);

    const router = useRouter();


    console.log("router");
    console.log(router);

    const fetchProfileData = async () => {
        const refreshToken = Cookies.get('refreshToken'); 

        try {
           const response = await axios.get(`http://localhost:8080/api/get-profile-data?userId=${'672e03a9db75416be26e7711'}`,{
            withCredentials: true, 
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
          })
          if (response?.data?.profileData) {
             setProfileData(response?.data?.profileData);
          }
        }
        catch (err) {
          console.log(err);
        }
    }

    const fetchPostList = async () => {
        const refreshToken = Cookies.get('refreshToken'); 
        try {
          const response = await axios.get(`http://localhost:8080/api/postList?userId=${'672e03a9db75416be26e7711'}`,{
            withCredentials: true, 
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
           })
           setPostList(response?.data?.list);
        }
        catch (err) {

        }
    }

    useEffect(() => {
       fetchProfileData();
       fetchPostList();
    }, [])


    const handleChange = (e) => {
          setPostMessage(e.target.value);
    }

    const onPostSubmit= async () => {
        const refreshToken = Cookies.get('refreshToken'); 
        try {
            const response = await axios.post('http://localhost:8080/api/post', {
                post: postMessage, 
                userId: '672e03a9db75416be26e7711'
            }, {
                withCredentials: true, 
                headers: {
                  Cookie: `refreshToken=${refreshToken}`,
                },
            })


            console.log("response");
            console.log(response);
        }
        catch (err) {
           console.log("error");
           console.log(err);
        }
    }

    return (
        <div>
           Welcome to Profile of {profileData?.username} 
           <div>
              Details of Profile Data of {profileData?.username}
              <div>
                 EMail: {profileData?.email}
                 <div>
                 </div>
              </div>
           </div>
           <div>
           <div>
              Create Post
            </div>
            <div>
            <textarea 
              value={postMessage} 
              onChange={handleChange}
              placeholder="Type your post here...." 
            />
            </div>
            <button onClick={() => { onPostSubmit(); }}>
                Submit for Post
            </button>
           </div>
           <div>
               Post list
           </div>
           <div>
             {postList.map((item, index) => {
                return (
                    <div key={index}>
                        {item.message}
                    </div>
                )
             })}
           </div>
           <div>
               Analytics of Profile
           </div>
           <div>
              total Visits: {totalVisits}
           </div>
           <div>
              People Visited in last 30 minutes
           </div>
           <div>
              {peoplesVisited.map((item, index) => {
                  <div key={index}>
                  <div>
                     Name:  { item.name }
                  </div>
                  <div>
                  Name:  { item.name }
               </div>
               </div>
              })}
           </div>
        </div>
    )
}


export default Dashboard;