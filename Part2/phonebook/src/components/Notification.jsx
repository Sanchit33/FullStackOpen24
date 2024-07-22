const Notification = ({ message, color }) => {
  const style = {
    color: color,
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={style} className="error">
      {message}
    </div>
  );
};

export default Notification;
