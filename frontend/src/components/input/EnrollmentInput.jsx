import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import validator from 'validator';

import { ErrorMessage, Label } from './styled';

function isNumeric(enrollment) {
  return validator.isNumeric(enrollment, { no_symbols: true });
}

function validate(enrollment) {
  const hasCorrectLength = enrollment.length === 11;
  const hasOnlyNumbers = isNumeric(enrollment);

  return hasCorrectLength && hasOnlyNumbers;
}

export default function EnrollmentInput({
  initialValue,
  addValidator,
  innerref,
}) {
  const [enrollment, setEnrollment] = useState(initialValue);
  const errorMsgRef = useRef();

  useEffect(() => {
    setEnrollment(initialValue);
  }, [initialValue]);

  useEffect(() => {
    addValidator('enrollment', () => {
      const hasNoError = validate(enrollment);
      updateErrorMessage(!hasNoError);
      return hasNoError;
    });
  }, [enrollment, addValidator, setEnrollment]);

  function updateErrorMessage(hasError) {
    const errorMsg = errorMsgRef.current;
    errorMsg.innerText = hasError ? 'Must have 11 numeric characters' : '';
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setEnrollment(inputValue);

    const hasError = !validate(inputValue);
    updateErrorMessage(hasError);
  };

  return (
    <>
      <Label htmlFor="enrollment">
        <input
          ref={innerref}
          type="text"
          value={enrollment}
          placeholder="Enrollment"
          onChange={handleInputChange}
          maxLength={11}
        />
      </Label>
      <ErrorMessage ref={errorMsgRef} />
    </>
  );
}

EnrollmentInput.defaultProps = {
  initialValue: '',
};

EnrollmentInput.propTypes = {
  initialValue: PropTypes.string,
  addValidator: PropTypes.func.isRequired,
  innerref: PropTypes.object.isRequired, // eslint-disable-line
};
