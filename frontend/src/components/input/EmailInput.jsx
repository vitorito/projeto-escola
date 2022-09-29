import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import validator from 'validator';

import { ErrorMessage, Label } from './styled';

function validate(email) {
  return validator.isEmail(email);
}

export default function EmailInput({ initialValue, addValidator, innerref }) {
  const [email, setEmail] = useState(initialValue);
  const errorMsgRef = useRef();

  useEffect(() => {
    setEmail(initialValue);
  }, [initialValue]);

  useEffect(() => {
    addValidator('email', () => {
      const hasNoError = validate(email);
      updateErrorMessage(!hasNoError);
      return hasNoError;
    });
  }, [email, addValidator]);

  function updateErrorMessage(hasError) {
    const errorMsg = errorMsgRef.current;
    errorMsg.innerText = hasError ? 'Invalid E-mail' : '';
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const hasError = !validate(inputValue);
    updateErrorMessage(hasError);
  };

  return (
    <>
      <Label htmlFor="email">
        <input
          ref={innerref}
          type="text"
          value={email}
          placeholder="E-mail"
          onChange={handleInputChange}
          maxLength={255}
        />
      </Label>
      <ErrorMessage ref={errorMsgRef} />
    </>
  );
}

EmailInput.defaultProps = {
  initialValue: '',
};

EmailInput.propTypes = {
  initialValue: PropTypes.string,
  addValidator: PropTypes.func.isRequired,
  innerref: PropTypes.object.isRequired, // eslint-disable-line
};
