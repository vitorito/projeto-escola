import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { ErrorMessage, Label } from './styled';

function validate(password, required) {
  const hasCorrectLength = password.length >= 4 && password.length <= 20;
  return (!required && password === '') || hasCorrectLength;
}

export default function PasswordInput({
  required,
  initialValue,
  addValidator,
  innerref,
}) {
  const [password, setPassword] = useState(initialValue);
  const errorMsgRef = useRef();

  useEffect(() => {
    setPassword(initialValue);
  }, [initialValue]);

  useEffect(() => {
    addValidator('password', () => {
      const hasNoError = validate(password, required);
      updateErrorMessage(!hasNoError);
      return hasNoError;
    });
  }, [password, addValidator, required]);

  function updateErrorMessage(hasError) {
    const errorMsg = errorMsgRef.current;
    errorMsg.innerText = hasError ? 'Between 4 and 20 characters' : '';
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();
    setPassword(inputValue);

    const hasError = !validate(inputValue, required);
    updateErrorMessage(hasError);
  };

  return (
    <>
      <Label htmlFor="password">
        <input
          ref={innerref}
          type="password"
          value={password}
          placeholder="Password"
          onChange={handleInputChange}
          maxLength={20}
        />
      </Label>
      <ErrorMessage ref={errorMsgRef} />
    </>
  );
}

PasswordInput.defaultProps = {
  initialValue: '',
  required: true,
};

PasswordInput.propTypes = {
  required: PropTypes.bool,
  initialValue: PropTypes.string,
  addValidator: PropTypes.func.isRequired,
  innerref: PropTypes.object.isRequired, // eslint-disable-line
};
