import { useState, forwardRef, useImperativeHandle } from 'react'

const Notification = forwardRef((props, refs) => {
  const [msg, setMsg] = useState(null)
  const [notificationType, setNotificationType] = useState('notif')

  const invokeNotification = (type, message) => {
    setNotificationType(type)
    setMsg(message)
    setTimeout(() => {
      setMsg(null)
    }, 2500)
  }

  useImperativeHandle(refs, () => {
    return {
      invokeNotification
    }
  })

  if(msg === null) return null

  let messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (notificationType === 'error'){
    messageStyle.color = 'red'
  }

  return(
    <div id='notification' style={messageStyle}>
      {msg}
    </div>
  )
})

Notification.displayName = 'Notification'

export default Notification