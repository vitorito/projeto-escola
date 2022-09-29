import { get } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import AgeInput from '../../components/input/AgeInput';
import EmailInput from '../../components/input/EmailInput';
import EnrollmentInput from '../../components/input/EnrollmentInput';
import NameInput from '../../components/input/NameInput';
import PasswordInput from '../../components/input/PasswordInput';
import Loading from '../../components/Loading';
import ProfilePicture from '../../components/ProfilePicture';
import api from '../../services/api';
import actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Avatar, Form } from './styled';

export default function EditStudent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [validators, setValidators] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const enrollmentInput = useRef();
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const ageInput = useRef();

  const [student, setStudent] = useState({});

  const getUserId = useCallback(() => {
    return location.pathname.split('/')[2];
  }, [location]);

  useEffect(() => {
    async function fetchStudent() {
      setIsLoading(true);
      const id = getUserId();
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        toast.error('An unexpected error ocurred');
      }
      setIsLoading(false);
    }

    const studentData = get(location, 'state.student', false);

    if (studentData) {
      setStudent(studentData);
    } else {
      fetchStudent();
    }
  }, [location, getUserId]);

  const validateForm = () => {
    return Object.values(validators)
      .map((validator) => validator())
      .every((value) => value);
  };

  const addValidator = useCallback((key, validator) => {
    setValidators((prevState) => {
      const newState = { ...prevState };
      newState[key] = validator;
      return newState;
    });
  }, []);

  const getInputValues = () => ({
    enrollment: enrollmentInput.current.value,
    name: nameInput.current.value,
    email: emailInput.current.value,
    password: passwordInput.current.value,
    age: ageInput.current.value,
  });

  const updateStudent = async () => {
    const data = getInputValues();
    try {
      const id = getUserId();
      const response = await api.patch(`/students/${id}`, data);

      if (response.status !== 200) throw new Error();

      dispatch(actions.loginSuccess({ ...response.data }));
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      toast.success('Edit success');
    } catch (error) {
      const statusCode = get(error, 'response.status', 0);
      if (statusCode === 400) {
        const errors = get(error, 'response.data.errors', {});
        Object.values(errors).forEach((message) => toast.error(message));
      } else if (statusCode === 409) {
        const errorMessage = get(error, 'response.data.message', '');
        toast.error(errorMessage);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasFormErrors = !validateForm();

    if (hasFormErrors) return;

    setIsLoading(true);
    await updateStudent();
    setIsLoading(false);
  };

  return (
    <Container width="480px">
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <h1>Edit</h1>
        <Avatar>
          <ProfilePicture size={140} src={student.profilePicUrl} />
          <Link to="/">
            <FaEdit size={22} />
          </Link>
        </Avatar>
        <EnrollmentInput
          initialValue={student.enrollment}
          addValidator={addValidator}
          innerref={enrollmentInput}
        />
        <NameInput
          initialValue={student.name}
          addValidator={addValidator}
          innerref={nameInput}
        />
        <EmailInput
          initialValue={student.email}
          addValidator={addValidator}
          innerref={emailInput}
        />
        <PasswordInput
          required={false}
          addValidator={addValidator}
          innerref={passwordInput}
        />
        <AgeInput
          initialValue={String(student.age)}
          addValidator={addValidator}
          innerref={ageInput}
        />
        <button type="submit">Save</button>
      </Form>
    </Container>
  );
}
