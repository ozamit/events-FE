import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';



const CountItemsWeHave = ({ EventsItem, usersPlusItems }) => {


    const count = usersPlusItems.filter((userPlusItem) => userPlusItem.ItemId === EventsItem._id).length

  return (
    <div>
        <ListItemButton>
            <Typography>{count}</Typography>
            <Typography>:בנתיים יש </Typography>
        </ListItemButton>
    </div>
  )
}

export default CountItemsWeHave