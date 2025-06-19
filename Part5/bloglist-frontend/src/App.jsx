import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ text: "username or password is incorrect", type: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create new blog">
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
    );
  };

  const createNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setMessage({
        type: "success",
        text: `a new blog ${blog.title} by ${blog.author} added`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setBlogs(blogs.concat(blog));
    } catch (error) {
      setMessage({ text: "error adding blog", type: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLike = async (id) => {
    const blogUpdate = blogs.find((b) => b.id === id);
    const updatedBlog = {
      ...blogUpdate,
      likes: blogUpdate.likes + 1,
    };
    try {
      const updated = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((b) => (b.id !== id ? b : updated)));
      setMessage({
        type: "success",
        text: `you liked ${updated.title}`,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Login to like a blog",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        setMessage({
          type: "success",
          text: `Deleted ${blogToDelete.title}`,
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Login to delete a blog",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={message?.type} message={message?.text} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      )}
      {user && blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            username={user?.username}
          />
        ))}
    </div>
  );
};

export default App;
