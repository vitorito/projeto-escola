import styled from 'styled-components';

export const StudentContainer = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  height: 70px;
  gap: 15px;

  a {
    color: black;
  }

  .student-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .student-buttons * {
    cursor: pointer;
  }

  .edit-button {
    padding-bottom: 2px;
  }

  .name,
  .email {
    width: 30%;
    overflow-x: auto;
  }

  .enrollment {
    width: 18%;
    overflow: auto;
  }

  .age {
    margin-right: auto;
  }
`;
