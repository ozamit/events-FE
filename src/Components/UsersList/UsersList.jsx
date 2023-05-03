import React, { useState, useEffect } from 'react'
import "./UsersList.css"
import axios from "axios";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { host } from '../../utils/host';

const UsersList = ({ EventsUsers, AllUsers, isComing, EventsItems, user, usersPlusItems, fetchUsersDataNow }) => {

  const [currentUserItems, setCurrentUserItems ] = useState([])
  const [errorMsg, setErrorMsg ] = useState(0)
  const [finalRemove, setFinalRemove ] = useState(0)


  const temp = usersPlusItems.filter(usersPlusItem => usersPlusItem.userId === user._id)

  useEffect(() => {
    setCurrentUserItems(temp)
  }, [])


function handleNotComingClick() {

  console.log("currentUserItems", currentUserItems)

  if (currentUserItems.length > 0) {
    setErrorMsg(1)
    setFinalRemove(1)
  } else {
    setFinalRemove(1)
    }
}

function handlefinalCancel() {
  setFinalRemove(0)
  setErrorMsg(0)
}



  async function handleComingClick() {
    const dataToSend = {
        "userId": user._id,
        "eventId": EventsItems[0].eventId
    }
    console.log("dataToSend", dataToSend)
    const resUserPlusItems = await axios.put(`${host}/event/AddUserToEvent`, dataToSend)
    console.log("ComingRes", resUserPlusItems)
    setFinalRemove(1)
    window.location.reload();
}

async function handlefinalNotComingClick() {

    const dataToSend = {
        "userId": user._id,
        "eventId": EventsItems[0].eventId
    }
    console.log("dataToSend", dataToSend)
    const resUserPlusItems = await axios.put(`${host}/event/RemoveUserFromEvent`, dataToSend)
    console.log("ComingRes", resUserPlusItems)
    window.location.reload();

    // remove all user items from DB
    createDataToSend()
}

async function createDataToSend() { 

  currentUserItems.map((itemToRemoveFromUser, i) => {

          const dataToSend = {
            "userId" : itemToRemoveFromUser.userId, 
            "eventId" : itemToRemoveFromUser.eventId,
            "ItemId" : itemToRemoveFromUser.ItemId
          }
          console.log("dataToSend", itemToRemoveFromUser)
          addItemsToDB(dataToSend)
      })
  }

  async function addItemsToDB(data) {
    const res = await axios.put(`${host}/items/removeItemFromUser`, data)
    console.log("res", res)
    fetchUsersDataNow()
    window.location.reload();
}

  return (
    <div className='usersListPage'>
          { isComing === false && user !== "אורח" && <Button className='removeBtn' onClick={handleComingClick} variant="contained">הרשמה לאירוע</Button> }
          { isComing === true && finalRemove < 1 && <Button onClick={handleNotComingClick} variant="contained">הסרה - אני לא מגיע</Button> }
          { errorMsg > 0 && <Typography className='removeMsg'>נרשמת להביא ציוד, ביטול ההרשמה לאירוע יסיר את הציוד שאמרת שתביא</Typography> }
          { finalRemove > 0 && <Button onClick={handlefinalCancel} variant="contained">השאר אותי רשום</Button> }
          { finalRemove > 0 && <Button onClick={handlefinalNotComingClick} variant="contained">סופי! ביטול הרשמה</Button> }
          
        {EventsUsers.map((item, i) => { 
          console.log("EventsUsers", EventsUsers)
          console.log("AllUsers", AllUsers)
          console.log("item", item)
          const thisUser = AllUsers.filter((user, i) => user._id === item.userId)
          console.log("thisUser", thisUser)

        return <Box key={i} width="100%">
                          <Divider></Divider>
        <nav className='listUser'>
              <List>
                <ListItem >
                    <ListItemText primary={thisUser[0].username} />
                    <AccountCircleIcon className='AccountCircleIcon' />
                </ListItem>
              </List>
            </nav>
          </Box>

      })}
    </div>
  )
}

export default UsersList