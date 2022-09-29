import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
  color: ${colors.secondaryColor};

  input {
    background-color: transparent;
    color: inherit;
    height: 30px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #9a9a9a;
    padding: 15px 5px 0 5px;

    &:focus {
      border-bottom: 1px solid black;
    }
  }
`;

export const ErrorMessage = styled.small`
  height: 12px;
  margin-right: auto;
  font-size: 14px;
  padding: 5px 6px;
  color: ${colors.errorColor};
`;
