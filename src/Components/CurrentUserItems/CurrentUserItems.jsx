import React, { useState, useEffect } from 'react'
import './CurrentUserItems.css'
import axios from "axios";

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

const CurrentUserItems = ({ EventsItems, usersPlusItems, EventsUsers, user, fetchUsersDataNow, isComing }) => {
    
  const [currentUserItems, setCurrentUserItems ] = useState([])
  const [itemsToRemoveFromUser, setItemsToRemoveFromUser ] = useState([])

  const temp = usersPlusItems.filter(usersPlusItem => usersPlusItem.userId === user._id)

  useEffect(() => {
    setCurrentUserItems(temp)
  }, [])
  
  // console.log(currentUserItems)

  function handleRemoveItem(itemToRemove) {
    console.log("currentUserItems", currentUserItems)
    console.log("itemToRemove", itemToRemove)
    const index = currentUserItems.findIndex(item => item.ItemId === itemToRemove.ItemId);
    console.log("index", index)
    if (index !== -1) {
    const newData = [...currentUserItems];
    // console.log("newData", newData)
    newData.splice(index, 1);
    setCurrentUserItems(newData);

    const newDataToRemove = [...itemsToRemoveFromUser, itemToRemove];
    // console.log("newDataToRemove", newDataToRemove)
    setItemsToRemoveFromUser(newDataToRemove)
}
    console.log("itemsToRemoveFromUser - removed", itemsToRemoveFromUser)
  }

  function handleRemoveItemFromUser() {
    console.log("saveButtonClick")
    createDataToSend()
  }

  async function createDataToSend() { 

    itemsToRemoveFromUser.map((itemToRemoveFromUser, i) => {

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
      const res = await axios.put("http://localhost:3000/items/removeItemFromUser", data)
      console.log("res", res)
      fetchUsersDataNow()
      window.location.reload();
  }


    return (
    <div>
    { user !== "אורח" && <Typography className='CurrentUserItemsTitle'>אני מביא</Typography>}
    { user === "אורח" && <Typography>על מנת לראות את רשימת הציוד שאתה מביא יש להתחבר למערכת</Typography>}
    
    {itemsToRemoveFromUser.length > 0 && <Button onClick={handleRemoveItemFromUser} variant="contained">שמור</Button>}
    {itemsToRemoveFromUser.length > 0 && <Typography>התבלבלת? בעצם אתה כן מביא את הציוד שמחקת מהרשימה? פשוט עבור לעמוד אחר באפליקציה מבלי ללחוץ על כפתור השמירה והמידע ישוחזר אוטומטית</Typography>}
    
    { 
    currentUserItems.map((Item, i) => {
        // console.log("Item",Item)
        const itemName = EventsItems.filter(item => item._id === Item.ItemId)
        // console.log("itemName",itemName)

                return <List className='oneItem'>
                <ListItem disablePadding>
                  { isComing === true &&
                      <HighlightOffIcon onClick={() => handleRemoveItem(Item)} />
                  }
                  <ListItemButton className='itemName'>
                    <ListItemText primary="1 X" />
                    <ListItemText primary={itemName[0].ItemName} />
                  </ListItemButton>
                    <PlaylistAddCheckCircleIcon />
                </ListItem>
              </List>
            }) 
            }
    </div>
  )
}

export default CurrentUserItems