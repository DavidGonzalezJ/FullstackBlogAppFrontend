import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("Blog renders title and author but not url or likes by default", () => {
  const blog = {
    title: "Miguelin Durain",
    author: "Michael J. Fox",
    url: "umaite.com/wawawiwa",
    likes: "0",
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} likeHandler={mockHandler} deleteHandler={mockHandler} />,
  );

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Miguelin Durain");
  expect(div).toHaveTextContent("Michael J. Fox");

  const notShown = container.querySelector(".blogDetails");
  expect(notShown).toHaveStyle("display: none");
  expect(notShown).toHaveTextContent("umaite.com/wawawiwa");
  expect(notShown).toHaveTextContent("0");
});

test("Blog renders url and likes if button is pressed", async () => {
  const blog = {
    title: "Miguelin Durain",
    author: "Michael J. Fox",
    url: "umaite.com/wawawiwa",
    likes: "0",
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} likeHandler={mockHandler} deleteHandler={mockHandler} />,
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  const shown = container.querySelector(".blogDetails");
  expect(shown).not.toHaveStyle("display: none");
  expect(shown).toHaveTextContent("umaite.com/wawawiwa");
  expect(shown).toHaveTextContent("0");
});

test("If like button is hit twice, the event handler is called twice", async () => {
  const blog = {
    title: "Miguelin Durain",
    author: "Michael J. Fox",
    url: "umaite.com/wawawiwa",
    likes: "0",
  };

  const mockHandler = jest.fn();

  const { container } = render(
    <Blog blog={blog} likeHandler={mockHandler} deleteHandler={mockHandler} />,
  );

  const user = userEvent.setup();
  const button = screen.getByText("like");

  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
