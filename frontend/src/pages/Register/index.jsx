import { get } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AgeInput from '../../components/input/AgeInput';
import EmailInput from '../../components/input/EmailInput';
import EnrollmentInput from '../../components/input/EnrollmentInput';
import NameInput from '../../components/input/NameInput';
import PasswordInput from '../../components/input/PasswordInput';
import Loading from '../../components/Loading';
import api from '../../services/api';
import actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validators, setValidators] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const enrollmentInput = useRef();
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const ageInput = useRef();

  function validateForm() {
    let hasNoErrors = true;
    const validatorsArray = Object.values(validators);
    validatorsArray.forEach((validator) => {
      if (!validator()) {
        hasNoErrors = false;
      }
    });

    return hasNoErrors;
  }

  const addValidator = useCallback((key, validator) => {
    setValidators((prevState) => {
      const newState = { ...prevState };
      newState[key] = validator;
      return newState;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = !validateForm();

    if (formErrors) {
      return;
    }

    const body = {
      enrollment: enrollmentInput.current.value,
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
      age: ageInput.current.value,
    };

    setIsLoading(true);
    try {
      const response = await api.post('/students', body);

      if (response.status !== 201) throw new Error();

      const { data } = response;
      dispatch(actions.loginSuccess({ ...data }));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      toast.success('Account created');
      navigate('/', { replace: true });
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
    setIsLoading(false);
  };

  return (
    <Container width="380px">
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <EnrollmentInput
          addValidator={addValidator}
          innerref={enrollmentInput}
        />
        <NameInput addValidator={addValidator} innerref={nameInput} />
        <EmailInput addValidator={addValidator} innerref={emailInput} />
        <PasswordInput addValidator={addValidator} innerref={passwordInput} />
        <AgeInput addValidator={addValidator} innerref={ageInput} />
        <button type="submit">Create your account</button>
      </Form>
    </Container>
  );
}
