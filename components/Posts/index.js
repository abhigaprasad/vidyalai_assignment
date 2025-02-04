import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../context/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSmallerDevice } = useWindowWidth();
  const [postNum,setPostNum] = useState([5,10])

  const fetchPost = async () => {
    const { data: posts } = await axios.get('/api/v1/posts', {
      params: { start: 0, limit : isSmallerDevice ? postNum[0] : postNum[1] },
    });
    setPosts(posts);
  };


  useEffect(() => {
    fetchPost();
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);
    setPostNum([postNum[0]+5,postNum[1]+5])
    console.log(posts)
    fetchPost();

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    console.log(posts)
  };

  return (
    <Container>
      <PostListContainer>
        {posts?.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>
    </Container>
  );
}
