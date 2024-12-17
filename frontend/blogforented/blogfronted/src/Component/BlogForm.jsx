import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogForm.css';

const BlogForm = () => {
  const [categories, setCategories] = useState([]); // Categories list
  const [blogs, setBlogs] = useState([]); // Blog list
  const [formData, setFormData] = useState({
    id: null, // For PUT requests
    title: '',
    description: '',
    author: '',
    image: null,
    category: '',
    isPublished: false,
  });

  // Fetch Categories and Blogs on Component Mount
  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, []);

  const fetchCategories = () => {
    axios
      .get('http://127.0.0.1:8000/api/categories/')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const fetchBlogs = () => {
    axios
      .get('http://127.0.0.1:8000/api/blogs/')
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error('Error fetching blogs:', error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const data = new FormData(); // Creates a new FormData object to handle file uploads
    data.append('title', formData.title); // Appends the title field to the FormData
    data.append('description', formData.description); // Appends the description field
    data.append('author', formData.author); // Appends the author field
    data.append('category', formData.category); // Appends the category field
    data.append('is_published', formData.isPublished); // Appends the isPublished field
    if (formData.image) data.append('image', formData.image); // Appends the image if provided

    try {
      if (formData.id) {
        // If formData has an id, it means we're editing an existing blog, so send a PUT request
        await axios.put(`http://127.0.0.1:8000/api/blogs/${formData.id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }, // Set headers for file upload
        });
        alert('Blog updated successfully!'); // Alert on successful update
      } else {
        // If formData does not have an id, it's a new blog, so send a POST request
        await axios.post('http://127.0.0.1:8000/api/blogs/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }, // Set headers for file upload
        });
        alert('Blog added successfully!'); // Alert on successful creation
      }
      resetForm(); // Reset the form fields
      fetchBlogs(); // Refresh the blog list after submitting
    } catch (error) {
      console.error('Error submitting blog:', error); // Log any errors to the console
      alert('Failed to submit blog.'); // Alert if there was an error
    }
  };

  const handleEdit = (blog) => {
    // Pre-fills the form with the blog data for editing
    setFormData({
      id: blog.id, // Set the blog id
      title: blog.title, // Set the blog title
      description: blog.description, // Set the blog description
      author: blog.author, // Set the blog author
      category: blog.category, // Set the blog category
      isPublished: blog.is_published, // Set the is_published status
      image: null, // Reset the image field (image cannot be pre-filled in a file input)
    });
  };

  const resetForm = () => {
    // Resets the form fields to their initial state
    setFormData({
      id: null, // Clear the blog id
      title: '', // Clear the title
      description: '', // Clear the description
      author: '', // Clear the author
      image: null, // Clear the image
      category: '', // Clear the category
      isPublished: false, // Set the isPublished status to false
    });
  };

  return (
    <div className='main'>
      <h1>The Blog app </h1>
    <div className="blog-form-container">
      <h2>{formData.id ? 'Edit Blog' : 'Add Blog'}</h2> 
      {/* Displays 'Edit Blog' if editing, otherwise 'Add Blog' */}
      <form onSubmit={handleSubmit} className="blog-form">
        {/* Blog form with input fields for title, description, author, image, category, and isPublished */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter blog description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Is Published
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">{formData.id ? 'Update' : 'SAVE'}</button> 
          {/* Button text changes depending on whether it's an edit or add */}
          <button type="button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>

      <h2>Blog List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.category}</td>
              <td>{blog.is_published ? 'Yes' : 'No'}</td>
              <td>
                {blog.image && (
                  <img
                    src={`http://127.0.0.1:8000${blog.image}`}
                    alt={blog.title}
                    style={{ width: '100px', height: 'auto', borderRadius: '5px' }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(blog)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>
    </div>
   
  );
};

export default BlogForm;
