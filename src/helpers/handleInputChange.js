import { toEnglishNumberWithoutComma } from './persian';

export default async (state, setState, event, options = {}) => {
  const { name, value, checked } = event.target;
  const newState = {...state};
  if (options.isNumber)
    newState[name] = toEnglishNumberWithoutComma(value);
  else if (options.isCheckbox)
    newState[name] = checked;
  else
    newState[name] = value;

  await setState(newState);
};
