import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    await createNewBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            data-testid="10001"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="10002"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="10003"
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};
