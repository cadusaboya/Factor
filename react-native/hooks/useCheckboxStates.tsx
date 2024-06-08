import { useState } from 'react';


// Custom hook to manage the state of multiple checkboxes
export const useCheckboxStates = (initialStates) => {
  const [checkboxStates, setCheckboxStates] = useState(initialStates);

  const toggleCheckbox = (index) => {
    setCheckboxStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index]; // Toggle the state of the checkbox at the specified index
      return newStates;
    });
  };

  return { checkboxStates, toggleCheckbox };
};