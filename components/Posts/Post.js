import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const Circle = styled.div(() => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: 'gray',
  display: 'flex',
  justifyContent: 'center',
  margin : "5px",
  alignItems: 'center',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
}));

const NameDiv = styled.div(()=>({
  display : 'flex',
  flexDirection:"column",
  justifyContent : 'start',
  fontSize: '14px',
  alignItems : "start"
}))

const ParentNameDiv = styled.div(()=>({
  display : 'flex',
  justifyContent : 'start',
  padding : "5px",
  alignItems : "center",
  gap:"4px"
}))

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%', // Center the button vertically
  transform: 'translateY(-50%)', // Adjust for the height of the button
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px', // Optionally add border radius
  zIndex: 1, // Ensure buttons are above the carousel items
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;


const Post = ({ post }) => {
  const carouselRef = useRef(null);


  const handleNextClick = () => {
    console.log(post)
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 50,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    console.log(post)
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <CarouselContainer>
        <ParentNameDiv>
          <Circle >
            LG
          </Circle>
          <NameDiv>
              <h2>Leanne Graham</h2>
              <h5>Sincere@april.biz</h5>
          </NameDiv>
        </ParentNameDiv>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
