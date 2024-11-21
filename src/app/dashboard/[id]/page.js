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
import { fetchProfile } from "@/app/feature/userProfileSlice";
import messageI from '../../../../public/profile/message.svg';
import likeI from '../../../../public/profile/like.svg';
import CommentModal from "@/app/components/CommentModal";
import LikeModal from "@/app/components/LikeModal";
import { toast } from "react-toastify";
import { RingLoader } from 'react-spinners';
import ShowPostModal from "@/app/components/ShowPosrModal";

function Loader() {
  return <RingLoader color="#3b82f6" size={60} />;
}

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
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showLikeModal, setShowLikeModal] = useState(false);
    const [likesArr, setLikesArr] = useState([]);
    const [postId, setPostId] = useState(null);
    const [postObj,setPostObj] = useState(null);
    const [showPost, setShowPost] = useState(false);

    const userProfile = useSelector((state) => state.userProfile);

 
    const dispatch = useDispatch();

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
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/postlist`,{
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
       dispatch(fetchProfile())
    }, [])

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
            }, {
                withCredentials: true, 
                headers: {
                  Cookie: `refreshToken=${refreshToken}`,
                },
            })
            if (response?.data?.postList?.length) {
              toast.success("Wow Post created Successfully");
               setPostList(response?.data?.postList);
            }

        }
        catch (err) {
           console.log("error");
           console.log(err);
        }
    }

    const onLikeClick = async (userId, postId) => {
      const refreshToken = Cookies.get('refreshToken'); 
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/likes`, {
                userId,
                postId
            }, {
                withCredentials: true, 
                headers: {
                  Cookie: `refreshToken=${refreshToken}`,
                },
            })
            setLikesArr(response?.data?.usersData);
            fetchPostList();
            
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

    const onUserFollow = async () => {
      const refreshToken = Cookies.get('refreshToken');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/followUser`, {
        userId : params.id,
    }, {
        withCredentials: true, 
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      })
      fetchProfileData();
      toast.success("followed sucessfully");
    }

    const onPostClick = async (item) => {
          setPostObj(item);
          setShowPost(true);
    }

    useEffect(() => {
       console.log(textSearch, "textSearch");
       fetchUsersOnSearch(textSearch);
    }, [textSearch]);

    if (!userProfile?.data?.profileData?._id) {
       return  (
       <div className="loader-container">
        <Loader/>
        </div>
      )
    }

    return (
        <div className="dashboard-container">
           <div className="dashboard-row">
            <div className="profile-container">
            <div className="title-bar">
                <img src={photoI.src} width={'50px'} height={'50px'} style={{ borderRadius: 14 }}/>
                👋 Hello {profileData?.username || userProfile?.data?.profileData?.username} 😊🌟
            </div>
            {(profileData?.followers || []).includes(userProfile?.data?.profileData?._id) ? <button className="follow-button" onClick={() => { onUserFollow();  }}>Followed</button> : <button className="follow-button" onClick={() => { onUserFollow(); }}>Follow Me</button>}
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
               backgroundColor: 'white',
               color: 'black',
               border: '1px solid #444',
               padding: '10px',
               borderRadius: '5px',
               marginRight: '10px'
             }}
            />
            </div>
            </div>
            {!!searchResults?.length && <div className="search-container">
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
            </div>}
            <Modal profileData={userProfile}/>
            {userProfile?.data?.profileData?._id === params.id ? <div className="posts-container">
                Create your Post here
                <div> 
                <textarea 
              value={postMessage} 
              onChange={handleChange}
              placeholder="Type your post here...." 
              className="styled-textarea"
            />
                </div>
                <button className="post-button" onClick={() => { onPostSubmit(); }}>
                  Create 
                </button> 
            </div> : null}
            <div className="post-list-container">
                {userProfile?.data?.profileData?._id === params.id ? 'Your Posts' : `${profileData?.username}'s Posts`}
                {!!postList?.length && <div className='post-lists'>
                   {postList.map((item, index) => {

                      return (
                        <div className="post-container" key={index} onClick={() => {  onPostClick(item); }}>
                             {item.message || ''}
                        </div>
                      )
                      return (
                        <div key={index}>
                            {item.message || ''}
                            <div className="svg-container">
                            <div className="single-svg" onClick={() => { setPostId(item); setShowCommentModal(true) }}>
                             {item.comments?.length}
                            <img src={messageI.src} width={'20px'} height={'20px'}/>
                            </div> 
                            <div className="single-svg" onClick={() => { setShowLikeModal(true); onLikeClick(userProfile?.data?.profileData?._id,  item._id); }}>
                                {item?.likes?.length || 0}
                              <img src={likeI.src} width={'20px'} height={'20px'}/>
                            </div>
                            </div>
                        </div>
                      )
                   })}
                </div>}
            </div>
            {showCommentModal &&  <CommentModal comments={postId.comments} postId={postId._id} setShowModel={setShowCommentModal} fetchPostList={fetchPostList}/>}
            {showLikeModal &&  <LikeModal setShowModel={setShowLikeModal} likesArr={likesArr}/>}
            {showPost && <ShowPostModal postObj={postObj} setShowPost={setShowPost}/>}
        </div>
    )

}


export default Dashboard;