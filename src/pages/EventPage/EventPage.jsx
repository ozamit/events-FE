import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./EventPage.css"
import axios from "axios";
import UsersList from '../../Components/UsersList/UsersList';
import ItemsList from '../../Components/ItemsList/ItemsList';
import ItemsNeeded from '../../Components/ItemsNeeded/ItemsNeeded';
import CurrentUserItems from '../../Components/CurrentUserItems/CurrentUserItems';
import EventInfo from '../../Components/EventInfo/EventInfo';

import { host } from '../../utils/host';

//MUI
//appBar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
// body
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const EventPage = ({ user, setUser }) => {

    const [EventsUsers, setEventsUsers] = useState([{}]);
    const [AllUsers, setAllUsers] = useState([{}]);
    const [EventsItems, setEventsItems] = useState([{}]);
    const [usersPlusItems, setUsersPlusItems] = useState([{}]);
    const [componentToDisplay, setComponentToDisplay] = useState("info");
    const [isComing, setIsComing] = useState(Boolean);

    const navigate = useNavigate();


    function handleComponentToDisplay(component) {
    setComponentToDisplay(component)
    console.log(component)
}

    useEffect(() => {
        
            async function fetchUsersData() {
            const localEventId = localStorage.getItem('eventId')
            // console.log(localEventId)
            const data = {localEventId}
            // console.log("data1", data)
            const res1 = await axios.put(`${host}/event/getEventsUsers`, data)
            setEventsUsers(res1.data.data)
            console.log("res1.data.data (EventsUsers)", res1.data.data)
            console.log("EventsUsers", EventsUsers)

            const resItems = await axios.put(`${host}/items/getEventsItems`, data)
            setEventsItems(resItems.data.data)
            // console.log("EventsItems", resItems.data)

            const resUserPlusItems = await axios.put(`${host}/items/getUsersItems`, data)
            setUsersPlusItems(resUserPlusItems.data.data)
            // console.log("usersPlusItems", usersPlusItems)

            const resAllUsers = await axios.put(`${host}/user/getAllUsers`, data)
            // console.log("resAllUsers", resAllUsers)
            
            setAllUsers(resAllUsers.data.data)
            // console.log("AllUsers", AllUsers)

            }
            fetchUsersData()

            console.log("user", user)
        }, []);

        // console.log("EventsUsers1", EventsUsers)

        useEffect(() => {

          function checkIfUserIsComing() {
            const comingCheck = EventsUsers.filter(user1 => user1.userId === user._id)
              console.log("step1 EventsUsers", EventsUsers)
              console.log("user._id", user._id)
              console.log("comingCheck", comingCheck)
              if (comingCheck.length > 0) { setIsComing(true) } else
                  { setIsComing(false) }
              
          }
          checkIfUserIsComing()

      }, [EventsUsers]);


        useEffect(() => {

            function checkIfUserIsComing() {
                const comingCheck = EventsUsers.filter(user1 => user1.userId === user._id)
                console.log("comingCheck", comingCheck)
                if (comingCheck.length > 0 && isComing === true) { console.log("1") }
                if (comingCheck.length > 0 && isComing === false) { setIsComing(true) }
                if (comingCheck.length < 1 && isComing === false) { console.log("2") }
                if (comingCheck.length < 1 && isComing === true) { setIsComing(false) }
                
            }
            checkIfUserIsComing()

        }, [isComing]);
        
        async function fetchUsersDataNow() {
        const localEventId = localStorage.getItem('eventId')
        console.log(localEventId)
        const data = {"eventId" : localEventId}
        console.log("data1", data)
        const res2 = await axios.put(`${host}/event/getEventsUsers`, data)
        setEventsUsers(res2.data.data)
        console.log("EventsUsers", EventsUsers)

        const resItems = await axios.put(`${host}/items/getEventsItems`, data)
        setEventsItems(resItems.data.data)
        // console.log("EventsItems", resItems.data)

        const resUserPlusItems = await axios.put(`${host}/items/getUsersItems`, data)
        setUsersPlusItems(resUserPlusItems.data.data)
        // console.log("usersPlusItems", usersPlusItems)
        }


        async function handleComingClick() {
            const dataToSend = {
                "userId": user._id,
                "eventId": EventsItems[0].eventId
            }
            console.log("dataToSend", dataToSend)
            const resUserPlusItems = await axios.put(`${host}/event/AddUserToEvent`, dataToSend)
            console.log("ComingRes", resUserPlusItems)
            window.location.reload();
        }

        async function handleNotComingClick() {
            const dataToSend = {
                "userId": user._id,
                "eventId": EventsItems[0].eventId
            }
            console.log("dataToSend", dataToSend)
            const resUserPlusItems = await axios.put(`${host}/event/RemoveUserFromEvent`, dataToSend)
            console.log("ComingRes", resUserPlusItems)
            window.location.reload();
        }

        function handleInfoMsgNotComing() {
            alert(`ניתן להירשם בעמוד "מי מגיע/הרשמה" לאחר ההרשמה תוכל/י לעדכן שאת/ה מביא ציוד מהרשימה`)
        }

        function handleInfoMsgIsComing() {
            alert(`ניתן לבטל הרשמה בעמוד "מי מגיע/הרשמה" לאחר ביטול הרשמה כל הציוד שנרשמת להביא ימחק`)
        }

        function handleInfoMsgGuest() {
            alert(`לאחר שתתחבר/י לאתר תוכל/' להירשם לאירועים ולעדכן שאת/ה מביא/ה ציוד לאירוע`)
        }


        function handleLogout() {
            if (localStorage.getItem('User') !== null) {
                localStorage.removeItem('User');
              }
            setUser("אורח")
            console.log(user)
            // window.location.reload()
            navigate('/');
          }
          
          function handleLogin() {
            navigate('/Login');
            console.log('Login')
          }

  return (

    <div className='EventPageWapper'>

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton> */}
        {user !== "אורח" && <Button color="inherit" onClick={handleLogout}><LogoutIcon /></Button> }
        {user === "אורח" && <Button color="inherit" onClick={handleLogin}><LoginIcon /></Button> } 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Eventify 🕺💃
          </Typography>
          <Typography color="inherit">{user.username}</Typography>
        </Toolbar>
      </AppBar>
    </Box>

    { isComing === true && user !== "אורח" &&
    <div className='isComingMsg'>
        <InfoOutlinedIcon className='infoIcon'></InfoOutlinedIcon>
        <div onClick={handleInfoMsgIsComing} >את/ה רשום לאירוע, לחץ למידע נוסף</div>
    </div>
    }
    { isComing === false && user !== "אורח" &&
    <div className='isNotComingMsg'>
        <InfoOutlinedIcon className='infoIcon'></InfoOutlinedIcon>
        <div onClick={handleInfoMsgNotComing} >עדיין לא נרשמת לאירוע, לחץ למידע נוסף</div>
    </div>
    }
    { user === "אורח" &&
    <div className='guest'>
        <InfoOutlinedIcon className='infoIcon'></InfoOutlinedIcon>
        <div onClick={handleInfoMsgGuest} >על מנת לראות את כל האפשרויות יש להתחבר לאתר</div>
    </div>
    }

    
    <Box>
      <BottomNavigation showLabels>
        {/* <BottomNavigationAction onClick={() => handleComponentToDisplay("info")}label="ראשי"/>
        <BottomNavigationAction onClick={() => handleComponentToDisplay("users")} label="מי מגיע / הרשמה"/>
        <BottomNavigationAction onClick={() => handleComponentToDisplay("items")}label="מי מביא מה"/>
        <BottomNavigationAction onClick={() => handleComponentToDisplay("ItemsNeeded")}label="רשימת ציוד"/>
        <BottomNavigationAction onClick={() => handleComponentToDisplay("currentUserItems")}label="מה אני מביא"/> */}

// options to hide the navigation for users which not logged in

        {user !== "אורח" && <BottomNavigationAction onClick={() => handleComponentToDisplay("info")}label="ראשי"/>}
        {user !== "אורח" && <BottomNavigationAction onClick={() => handleComponentToDisplay("users")} label="מי מגיע / הרשמה"/>}
        {user !== "אורח" && <BottomNavigationAction onClick={() => handleComponentToDisplay("items")}label="מי מביא מה"/>}
        {user !== "אורח" && <BottomNavigationAction onClick={() => handleComponentToDisplay("ItemsNeeded")}label="רשימת ציוד"/>}
        {user !== "אורח" && <BottomNavigationAction onClick={() => handleComponentToDisplay("currentUserItems")}label="מה אני מביא"/>}
      </BottomNavigation>
    </Box>
    <Divider />

    {/* { isComing === false && <Button onClick={handleComingClick} variant="contained">מגיע לאירוע</Button> }
    { isComing === true && <Button onClick={handleNotComingClick} variant="contained">לא מגיע</Button> } */}
    { componentToDisplay === "users" && <UsersList className='EventPageContentComponent' AllUsers={AllUsers} isComing={isComing} fetchUsersDataNow={fetchUsersDataNow} user={user} EventsItems={EventsItems} usersPlusItems={usersPlusItems} EventsUsers={EventsUsers}></UsersList> }
    { componentToDisplay === "items" && <ItemsList className='EventPageContentComponent' AllUsers={AllUsers} isComing={isComing} fetchUsersDataNow={fetchUsersDataNow} user={user} EventsItems={EventsItems} usersPlusItems={usersPlusItems} EventsUsers={EventsUsers}></ItemsList> }
    { componentToDisplay === "ItemsNeeded" && <ItemsNeeded className='EventPageContentComponent' AllUsers={AllUsers} isComing={isComing} fetchUsersDataNow={fetchUsersDataNow} user={user} EventsItems={EventsItems} usersPlusItems={usersPlusItems} EventsUsers={EventsUsers}></ItemsNeeded> }
    { componentToDisplay === "currentUserItems" && <CurrentUserItems className='EventPageContentComponent' AllUsers={AllUsers} isComing={isComing} fetchUsersDataNow={fetchUsersDataNow} user={user} EventsItems={EventsItems} usersPlusItems={usersPlusItems} EventsUsers={EventsUsers}></CurrentUserItems> }
    { componentToDisplay === "info" && <EventInfo className='EventPageContentComponent' AllUsers={AllUsers} isComing={isComing} fetchUsersDataNow={fetchUsersDataNow} user={user} EventsItems={EventsItems} usersPlusItems={usersPlusItems} EventsUsers={EventsUsers}></EventInfo> }

    </div>
  )
}

export default EventPage