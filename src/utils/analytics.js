import axios from "axios";
import Cookies from "js-cookie";

export const trackVisits = async (userId, visitedUserId) => {

    let localStorageData = localStorage.getItem(userId);
    localStorageData = JSON.parse(JSON.stringify(localStorageData || {}));

    let currentData = new Date();
    const timeInLocalStorage = new Date(localStorageData.currentDate);



    const ans = isDifferenceGreaterThanFiveMinutes(new Date(timeInLocalStorage), currentData);




    if (!ans && Object.keys(localStorageData).length) {
       return;
    }
    else {
        localStorage.removeItem(userId);
    }
    localStorage.setItem(userId, JSON.stringify({ visitedUserId, currentDate: new Date() }));
    sendStreamApi(userId, visitedUserId);
}

function isDifferenceGreaterThanFiveMinutes(date1, date2) {

    const difference = Math.abs(date1 - date2);
  

    const fiveMinutesInMilliseconds = 5 * 60 * 1000;
  
    return difference > fiveMinutesInMilliseconds;
  }

const sendStreamApi = async (userId, visitedUserId) => {
    try {
    const refreshToken = Cookies.get('refreshToken');
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/streams`, {
       userId,
       visitedUserId 
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