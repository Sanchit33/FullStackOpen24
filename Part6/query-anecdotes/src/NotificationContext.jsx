import { createContext, useReducer, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "show":
      return action.payload;
    case "clear":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification !== null) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "clear" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
