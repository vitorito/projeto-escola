import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);

  .loader {
    height: 100px;
    aspect-ratio: 1;
    border: 6px solid #e3e3e3;
    border-radius: 50%;
    border-right-color: #2f3e46;
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
