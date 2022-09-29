import styled from 'styled-components';

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.width}px`};
  aspect-ratio: 1;

  img {
    width: ${(props) => `${props.width}px`};
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid black;
  }
`;
