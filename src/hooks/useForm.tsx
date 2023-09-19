import React from 'react';

interface TInputValues {
  [value:string]: string;
}

export function useForm(inputValues:TInputValues):{
  values:typeof inputValues,
  handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void,
  setValues:(values:{})=>void
} {
  const [values, setValues] = React.useState<{}>(inputValues);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}