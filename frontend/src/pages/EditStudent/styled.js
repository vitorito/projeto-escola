import styled from 'styled-components';
import { primaryDarkColor } from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  align-items: center;

  button {
    margin-top: 30px;
    width: 110%;
  }

  h1 {
    color: #4a4a4a;
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  a {
    color: ${primaryDarkColor};
    margin-right: -3px;
    padding-left: 6px;
    margin-top: -12px;
    background-color: white;
    border-radius: 50%;
  }
`;
