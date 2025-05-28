import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import { userEvent } from "@testing-library/user-event";

test("BlogForm calls the event handler it received as props with the right details when a new blog is created", async () => {
  const user = userEvent.setup();
  const createNewBlog = vi.fn();
  render(<BlogForm createNewBlog={createNewBlog} />);
  const titleInput = screen.getByTestId("10001");
  const authorInput = screen.getByTestId("10002");
  const urlInput = screen.getByTestId("10003");
  const submitButton = screen.getByText("create");

  await user.type(titleInput, "Test Title");
  await user.type(authorInput, "Test Author");
  await user.type(urlInput, "http://test.com");
  await user.click(submitButton);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0]).toEqual({
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
  });
});
