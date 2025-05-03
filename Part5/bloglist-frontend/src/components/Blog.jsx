import React, { useState, useRef } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button>like</button>
          </p>
          <p>{blog.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
