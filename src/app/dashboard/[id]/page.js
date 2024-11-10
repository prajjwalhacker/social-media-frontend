"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Modal from "@/app/components/Modal";
import photoI from '../../../../public/profile/photo.svg';
import photo2I from '../../../../public/profile/photo2.svg';
import photo3I from '../../../../public/profile/photo3.svg';
import photo4I from '../../../../public/profile/photo4.svg';


const photoIArr = [photoI, photo2I, photo3I, photo4I];


const Dashboard = () => {

    const [profileData, setProfileData] = useState({});
    const [postMessage, setPostMessage] = useState('');
    const [postList, setPostList] = useState([]);
    const [peoplesVisited, setPeopleVisited]= useState([]);
    const [totalVisits,setTotalVisits] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const userProfile = useSelector((state) => state.userProfile);

    console.log("userProfile");
    console.log(userProfile)


   const params = useParams();
   const router = useRouter();

    const fetchProfileData = async () => {
        const refreshToken = Cookies.get('refreshToken'); 

        try {
           const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-another-profile-data?userId=${params.id}`,{
            withCredentials: true, 
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
          })
          if (response?.data?.userData) {
             setProfileData(response?.data?.userData);
          }
        }
        catch (err) {
          console.log(err);
        }
    }

    const fetchPostList = async () => {
        const refreshToken = Cookies.get('refreshToken'); 
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/postList?userId=${'672e03a9db75416be26e7711'}`,{
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`, {
                post: postMessage, 
                userId: '672e03a9db75416be26e7711'
            }, {
                withCredentials: true, 
                headers: {
                  Cookie: `refreshToken=${refreshToken}`,
                },
            })

        }
        catch (err) {
           console.log("error");
           console.log(err);
        }
    }


    const fetchUsersOnSearch = async (textSearch) => {
        const refreshToken = Cookies.get('refreshToken');
         try {
            console.log("hellloo");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userNameSearch?searchTerm=${textSearch}`, {
                withCredentials: true, 
                headers: {
                  Cookie: `refreshToken=${refreshToken}`,
                },
            });
            console.log("response?.data?.users");
            console.log(response?.data?.users);
            if (response?.data?.users) {
                setSearchResults(response?.data?.users || []);
            }

         }
         catch (err) {

         }
    }

    useEffect(() => {
       console.log(textSearch, "textSearch");
       fetchUsersOnSearch(textSearch);
    }, [textSearch]);


    console.log("SearchResults");
    console.log(searchResults);

    return (
        <div className="dashboard-container">
           <div className="dashboard-row">
            <div className="profile-container">
            <div className="title-bar">
                <img src={photoI.src} width={'50px'} height={'50px'} style={{ borderRadius: 14 }}/>
                Hello {'Prajjwal Soni !'} {' Welcome t your social media account !'}
            </div>
            <div className="email-bar">
                Your Email - {'Prajjwalsoni123@gmail.com'}
            </div>
            </div>
            <div className='search-bar'>
            <input
              type="text"
              placeholder="Search Your friends here..."
              value={textSearch}
              onChange={(e) => {
                 setTextSearch(e.target.value);
              }}
              style={{
               backgroundColor: 'black',
               color: 'white',
               border: '1px solid #444',
               padding: '10px',
               borderRadius: '5px',
             }}
            />
            </div>
            </div>
            <div className="search-container">
                Search Result 
                <div className="search-row">
                    {searchResults.map((item) => {
                        return (
                            <div key={item._id} className="search-item" onClick={() => {
                                router.push(`/dashboard/${item._id}?username=${item.username}`)
                            }}>
                                 <img src={photoIArr[Math.floor(Math.random() * 4)].src} alt='' width='40px' height='40px'/>
                                {item.username}
                            </div>
                        )
                    })}
                </div>
            </div>
            <Modal/>
            <div className="posts-container">
                Create your Post here
                <div>

                </div>
            </div>
        </div>
    )

    return (
        <>
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

        </>
    )
}


export default Dashboard;