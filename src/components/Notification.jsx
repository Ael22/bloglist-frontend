const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success" style={{ color: color }}>
      {message}
    </div>
  )
}

export default Notification