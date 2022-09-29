import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import validator from 'validator';

import { ErrorMessage, Label } from './styled';

function IsAlpha(name, locale = ['pt-BR']) {
  const splitedName = name.split(' ');
  return splitedName.every((word) => validator.isAlpha(word, locale));
}

function validate(name) {
  const hasCorrectLength = name.length >= 2 && name.length <= 255;
  return hasCorrectLength && IsAlpha(name);
}

export default function NameInput({ initialValue, addValidator, innerref }) {
  const [name, setName] = useState(initialValue);
  const errorMsgRef = useRef();

  useEffect(() => {
    setName(initialValue);
  }, [initialValue]);

  useEffect(() => {
    addValidator('name', () => {
      const hasNoError = validate(name);
      updateErrorMessage(!hasNoError);
      return hasNoError;
    });
  }, [name, addValidator]);

  function updateErrorMessage(hasError) {
    const errorMsg = errorMsgRef.current;
    errorMsg.innerText = hasError ? 'Between 2 and 255 characters' : '';
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    const hasError = !validate(inputValue);
    updateErrorMessage(hasError);
  };

  return (
    <>
      <Label htmlFor="name">
        <input
          ref={innerref}
          type="text"
          value={name}
          placeholder="Name"
          onChange={handleInputChange}
          maxLength={255}
        />
      </Label>
      <ErrorMessage ref={errorMsgRef} />
    </>
  );
}

NameInput.defaultProps = {
  initialValue: '',
};

NameInput.propTypes = {
  initialValue: PropTypes.string,
  addValidator: PropTypes.func.isRequired,
  innerref: PropTypes.object.isRequired, // eslint-disable-line
};
