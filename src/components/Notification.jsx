//import { useState, forwardRef, useImperativeHandle } from "react";
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const notificationType = useSelector((state) => state.notificationType)

  if (notification === '') return null

  let messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notificationType === 'error') {
    messageStyle.color = 'red'
  }

  return (
    <div id="notification" style={messageStyle}>
      {notification}
    </div>
  )
}

export default Notification
