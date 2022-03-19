import { useState } from 'react';
import { UseFormValues } from '../types';

type UpdateProps = {
  target: {
    value: string;
    name: string;
  };
};

export type UseFormUpdateValues = ({
  target: { value, name },
}: UpdateProps) => void;

interface ReturnProps {
  values: UseFormValues;
  updateValue: UseFormUpdateValues;
  resetValues: () => void;
}

export default function useForm(defaults: UseFormValues): ReturnProps {
  const [values, setValues] = useState(defaults);

  function updateValue({ target: { value, name } }: UpdateProps) {
    // Set the value by spreading in the existing values and chaging the key to the new value or adding it if not previously present.
    setValues({
      ...values,
      [name]: value,
    });
  }

  function resetValues() {
    setValues(defaults);
  }

  return { values, updateValue, resetValues };
}
