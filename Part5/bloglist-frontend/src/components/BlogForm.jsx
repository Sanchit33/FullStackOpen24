const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleAddBlog,
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input type="url" value={url} name="url" onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
export default BlogForm;
