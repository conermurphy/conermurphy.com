import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Get value from the changed field using the event.
    const { value } = e.target;

    // Set the value by spreading in the existing values and chaging the key to the new value or adding it if not previously present.
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
