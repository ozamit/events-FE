import React, { useState } from 'react'
import "./ItemsNeeded.css"
import axios from "axios";
import CountItemsWeHave from '../CountItemsWeHave/CountItemsWeHave';
// import CountNewItemsPerUser from '../CountNewItemsPerUser/CountNewItemsPerUser';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AddTaskIcon from '@mui/icons-material/AddTask';
import BallotIcon from '@mui/icons-material/Ballot';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

import { host } from '../../utils/host';

const ItemsNeeded = ({AllUsers, EventsItems, usersPlusItems, EventsUsers, user, fetchUsersDataNow, isComing}) => {
  
    const [newUserPlusItems, setNewUserPlusItems ] = useState([])

    function handleAddItem(EventsItem) {
        console.log("handleAddItem")

        setNewUserPlusItems([...newUserPlusItems, EventsItem])
        console.log("newUserPlusItems", newUserPlusItems)
    }

    function handleRemoveItem(EventsItem) {
        console.log("EventsItem", EventsItem)

        const index = newUserPlusItems.findIndex(item => item._id === EventsItem._id);
        if (index !== -1) {
        const newData = [...newUserPlusItems];
        newData.splice(index, 1);
        setNewUserPlusItems(newData);
    }
        console.log("newUserPlusItems - removed", newUserPlusItems)
    }

    function handleSaveButtonClick() {
        console.log("saveButtonClick")
        createDataToSend()
    }

    async function createDataToSend() { 

        newUserPlusItems.map((newUserPlusItem, i) => {

                const dataToSend = {
                  "userId" : user._id, 
                  "eventId" : newUserPlusItem.eventId,
                  "ItemId" : newUserPlusItem._id
                }
                console.log("dataToSend", dataToSend)
                addItemsToDB(dataToSend)
            })
        }

        async function addItemsToDB(data) {
            const res = await axios.put(`${host}/items/addItemToUser`, data)
            console.log("res", res)
            fetchUsersDataNow()
            window.location.reload();
        }


            
    return (
    <div className='page_wrapper'>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {newUserPlusItems.length > 0 && <Typography>:אני אביא</Typography> }
        {newUserPlusItems.map((newUserPlusItem, i) => {
                return <nav className='list1' key={i} aria-label="main mailbox folders">

                <List>
                  <div className='list1'>
                    <ListItem disablePadding >
                      { isComing === true && <HighlightOffIcon onClick={() => handleRemoveItem(newUserPlusItem)} /> }                 

                    <ListItemText className='ListItemText' primary="1 X" />
                    <ListItemText className='ListItemText' primary={newUserPlusItem.ItemName} />

                    <PlaylistAddCheckCircleIcon className='icon'/>
                    </ListItem>

                  </div>
              </List>
                </nav>
            }) }
            {newUserPlusItems.length > 0 && <Button onClick={handleSaveButtonClick} variant="contained">שמור</Button> }
            

        {EventsItems.map((EventsItem, i) => {

              return <nav key={i} aria-label="main mailbox folders">
                <div className='listItem'>
                  <List >
                    <ListItem disablePadding>

                      { isComing === true && user !== "אורח" && 
                        <AddTaskIcon onClick={() => handleAddItem(EventsItem)} />
                      }
                      <CountItemsWeHave EventsItem={EventsItem} usersPlusItems={usersPlusItems}></CountItemsWeHave>

                      <ListItemText primary={ `, ${EventsItem.Qneed}` } />
                      <Typography>:צריך</Typography>
                      <ListItemText className='ListItemText' primary={ `|| ${EventsItem.ItemName}` }/>
                      <BallotIcon className='icon'/>
                    </ListItem>
                  </List>

                </div>

            </nav>
            })
            }
            

    </Box>
    </div>
  )
}

export default ItemsNeeded