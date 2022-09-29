import { get } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EmailImput from '../../components/input/EmailInput';
import PasswordInput from '../../components/input/PasswordInput';
import Loading from '../../components/Loading';
import api from '../../services/api';
import actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [validators, setValidators] = useState({});
  const emailInput = useRef();
  const passwordInput = useRef();

  function validateForm() {
    let hasNoErrors = true;
    const validatorsArray = Object.values(validators);
    validatorsArray.forEach((validator) => {
      if (!validator()) hasNoErrors = false;
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

  const getPrevPath = () => {
    return get(props, 'location.state.prevPath', '/');
  };

  const getData = () => {
    return {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = !validateForm();

    if (formErrors) return;

    const data = getData();
    setIsLoading(true);
    try {
      const response = await api.post('/login', data);

      if (response.status !== 200) throw new Error();

      dispatch(actions.loginSuccess({ ...response.data }));
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      toast.success('Login success');
      setIsLoading(false);
      const prevPath = getPrevPath();
      navigate(prevPath, { replace: true });
    } catch (error) {
      setIsLoading(false);
      toast.error('Invalid email or password');
      dispatch(actions.loginFailure());
    }
  };

  return (
    <Container width="380px">
      <Loading isLoading={isLoading} />
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <EmailImput innerref={emailInput} addValidator={addValidator} />
        <PasswordInput innerref={passwordInput} addValidator={addValidator} />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}
