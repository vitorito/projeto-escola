import { useCallback, useEffect, useState } from 'react';
import Loading from '../../components/Loading';

import axios from '../../services/api';
import { Container } from '../../styles/GlobalStyles';
import Student from '../../components/Student';
import { StudentsContainer } from './styled';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteStudent = useCallback((index) => {
    return () => {
      setStudents((prevState) => {
        const newStudentsArr = [...prevState];
        newStudentsArr.splice(index, 1);
        return newStudentsArr;
      });
    };
  }, []);

  useEffect(() => {
    async function getStudents() {
      setIsLoading(true);
      const response = await axios.get('students');
      setStudents(() => response.data);
      setIsLoading(false);
    }
    getStudents();
  }, []);

  return (
    <Container style={{ width: '70%' }}>
      <Loading isLoading={isLoading} />
      <StudentsContainer>
        <h1>Students</h1>
        {students.map((student, index) => {
          return (
            <Student
              key={student.id}
              student={student}
              remove={deleteStudent(index)}
            />
          );
        })}
      </StudentsContainer>
    </Container>
  );
}
