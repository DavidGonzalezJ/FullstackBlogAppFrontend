import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const postBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    addBlog(blogObject);
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");
  };

  return (
    <form onSubmit={postBlog}>
      <div>
        title:
        <input
          type="text"
          value={blogTitle}
          name="BlogTitle"
          id="blog-title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={blogAuthor}
          name="BlogAuthor"
          id="blog-author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={blogUrl}
          name="BlogUrl"
          id="blog-url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button id="blog-submit" type="submit">
        create
      </button>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
