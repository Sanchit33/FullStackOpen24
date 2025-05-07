import PropTypes from "prop-types";
const Notification = ({ type, message }) => {
  if (message === null || type === null) {
    return null;
  }
  return <div className={type}>{message}</div>;
};

export default Notification;

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};
