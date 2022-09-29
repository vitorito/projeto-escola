import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { ErrorMessage, Label } from './styled';

function validate(age) {
  return age >= 1 && age <= 120;
}

export default function AgeInput({ initialValue, addValidator, innerref }) {
  const [age, setAge] = useState(initialValue);
  const errorMsgRef = useRef();

  useEffect(() => {
    setAge(initialValue);
  }, [initialValue]);

  useEffect(() => {
    addValidator('age', () => {
      const hasNoError = validate(age);
      updateErrorMessage(!hasNoError);
      return hasNoError;
    });
  }, [age, addValidator]);

  function updateErrorMessage(hasError) {
    const errorMsg = errorMsgRef.current;
    errorMsg.innerText = hasError ? 'Invalid age' : '';
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setAge(inputValue);

    const hasError = !validate(inputValue);
    updateErrorMessage(hasError);
  };

  return (
    <>
      <Label htmlFor="age">
        <input
          ref={innerref}
          type="number"
          value={age > 0 ? age : ''}
          placeholder="Age"
          onChange={handleInputChange}
          min={1}
          max={120}
        />
      </Label>
      <ErrorMessage ref={errorMsgRef} />
    </>
  );
}

AgeInput.defaultProps = {
  initialValue: '',
};

AgeInput.propTypes = {
  initialValue: PropTypes.string,
  addValidator: PropTypes.func.isRequired,
  innerref: PropTypes.object.isRequired, // eslint-disable-line
};
