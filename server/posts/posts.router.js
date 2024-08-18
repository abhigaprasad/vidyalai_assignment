const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch all posts
    const posts = await fetchPosts(req.query);
    // console.log(req.query,"req")
    // Use Promise.all to fetch images for all posts concurrently
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        // Fetch photos for each post
        const imageRes = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);

        // Extract the URLs
        const images = imageRes.data.map((image) => ({
          url: image.url,
        }));

        // Return the post with its images
        return {
          ...post,
          images,
        };
      })
    );

    // Send the response
    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts or images:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts or images' });
  }
});

module.exports = router;
