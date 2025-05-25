import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test(" blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: {
      username: "test username",
      name: "test name",
    },
  };

  render(<Blog key={blog.id} blog={blog} />);

  screen.debug();

  const element = screen.queryByText("Test Blog");
  const element2 = screen.queryByText("Test Author");
  const element3 = screen.queryByText("http://testurl.com");
  const element4 = screen.queryByText("5 likes");

  expect(element).toBeDefined();
  expect(element2).toBeDefined();
  expect(element3).toBeNull();
  expect(element4).toBeNull();
});
