import React from 'react'

const CountNewItemsPerUser = ({ newUserPlusItems, newUserPlusItem }) => {
 
    const count = newUserPlusItems.filter((userPlusItem) => userPlusItem._id === newUserPlusItem._id).length

  return (
    <div>{count}</div>
  )
}

export default CountNewItemsPerUser
