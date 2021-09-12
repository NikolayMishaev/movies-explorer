import { useState, useCallback } from "react";

export default function useFormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, title, validity } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: validity.patternMismatch ? title : e.target.validationMessage,
      // если для валидации поля input используется атрибут pattern, то вывести подробное сообщение об ошибке из значения атрибута title.
    });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}
