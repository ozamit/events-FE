import React, { useState, useEffect } from 'react'
import axios from "axios";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';

import { host } from '../../utils/host';

const AccordionContent = ({ AllUsers, usersPlusItems, user, itemId, eventId, loginUser, fetchUsersDataNow }) => {


const count = usersPlusItems.filter(userPlusItem =>
  userPlusItem.userId === user.userId && userPlusItem.eventId === eventId && userPlusItem.ItemId === itemId ).length;

// console.log("user", user)

async function handleRemoveItemClick() { 
    const dataToSend = {
      "userId" : loginUser._id, 
      "eventId" : eventId,
      "ItemId" : itemId
    }
    // console.log("dataToSend", dataToSend)
    const res = await axios.put(`${host}/items/removeItemFromUser`, dataToSend)
    console.log("res", res)
    console.log("handleRemoveItemClick")
    fetchUsersDataNow()
  }

  return (
      <div><Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {count !== 0 && 
    <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <AccountCircleIcon />
                {AllUsers.map((oneUser, i) => {
                  if (oneUser._id === user.userId) {
                    const userName = oneUser.username
                    return <ListItemText key={i} primary={userName}/>
                  }
                })}
                <ListItemText primary={count} />
                {loginUser._id === user._id && <Chip onClick={() => handleRemoveItemClick()} icon={<DeleteIcon />} label="בעצם לא" clickable/>}

              </ListItemButton>
            </ListItem>
          </List>
        </nav>}
      </Box>
    </div>
  )
}


export default AccordionContent