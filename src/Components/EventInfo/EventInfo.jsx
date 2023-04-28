import React from 'react'
import "./EventInfo.css"

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


const EventInfo = ({AllUsers, isComing, user, EventsItems, usersPlusItems, EventsUsers}) => {

  return (
    <div className='EventInfoWrapper'>
        <Typography> 👙 זולה בים</Typography>
        <Typography>10-14/8/2023</Typography>
        <Typography>חוף נווה ים</Typography>
        <Typography>
            <Link target="_blank" href="https://www.google.com/maps/place/%D7%97%D7%95%D7%A3+%D7%A0%D7%95%D7%95%D7%94+%D7%99%D7%9D%E2%80%AD/@32.6705799,34.9408725,14.25z/data=!4m6!3m5!1s0x151da1151482c245:0x79f661377552f1c1!8m2!3d32.6791889!4d34.9287273!16s%2Fg%2F11cs3h5pgk?hl=iw">
                לינק לגוגל מפות
            </Link>
        </Typography>
        <div className='infoItem'>
        <Typography>{EventsUsers.length}</Typography>
        <Typography>אישרו הגעה:</Typography>
        </div>
        

    </div>
  )
}

export default EventInfo
