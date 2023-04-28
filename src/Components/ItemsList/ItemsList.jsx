import React, { useEffect } from 'react'
import "./itemsList.css"
import axios from "axios";
import AccordionContent from '../AccordionContent/AccordionContent';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ItemsList = ({ AllUsers, EventsItems, usersPlusItems, EventsUsers, user, fetchUsersDataNow, isComing }) => {

  useEffect(() => {
    const count = usersPlusItems.filter(userPlusItem => userPlusItem.ItemId).length;
  }, []);



  async function handleAddItemClick(data) { 
    const dataToSend = {
      "userId" : user._id, 
      "eventId" : EventsItems[0].eventId,
      "ItemId" : data
    }
    console.log("dataToSend", dataToSend)
    const res = await axios.put("http://localhost:3000/items/addItemToUser", dataToSend)
    console.log("res", res)
    console.log("handleAddItemClick")
    fetchUsersDataNow()
    
    const count = usersPlusItems.filter(userPlusItem => userPlusItem.ItemId).length;
  }

  function handleExpandAccordionClick() {
    console.log("handleExpandAccordionClick")
  }


  return (
    <div className='ItemsListWrapper'>

    {EventsItems.map((item, i) => {
        const count = usersPlusItems.filter(userPlusItem => userPlusItem.ItemId === item._id).length
        // console.log("EventsUsers MAP", EventsUsers )

        return <div key={i}>
          
        <Accordion className="AccordionSummary">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleExpandAccordionClick}
          
        >
        <div className='quantity'>
        <Typography>{count}</Typography>
        <Typography> :יש לנו</Typography>
        </div>    
        <div className='quantity'>
        <Typography>{item.Qneed}</Typography>
        <Typography>:צריך</Typography>
        </div>
        <Typography>|| {item.ItemName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {EventsUsers.map((user1, i) => {
              return <AccordionContent key={i} AllUsers={AllUsers} fetchUsersDataNow={fetchUsersDataNow} eventId={item.eventId} loginUser={user} user={user1} itemId={item._id} usersPlusItems={usersPlusItems}></AccordionContent>
            })
            }
        </AccordionDetails>
      </Accordion>
        

        </div>;

      })}



    </div>
  )
}
export default ItemsList