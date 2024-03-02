import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("form calls event handler if received the right details", async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm addBlog={addBlog} />);

  const titleInput = container.querySelector("#blog-title");
  const authorInput = container.querySelector("#blog-author");
  const urlInput = container.querySelector("#blog-url");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "testing a blog...");
  await user.type(authorInput, "anonymous");
  await user.type(urlInput, "test.com/test");
  await user.click(sendButton);

  expect(addBlog.mock.calls).toHaveLength(1);

  expect(addBlog.mock.calls[0][0].title).toBe("testing a blog...");
  expect(addBlog.mock.calls[0][0].author).toBe("anonymous");
  expect(addBlog.mock.calls[0][0].url).toBe("test.com/test");
});
