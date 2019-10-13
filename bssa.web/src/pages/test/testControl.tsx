import React, { useState } from 'react';
import { FormGroup } from 'reactstrap';
import useForm from 'react-hook-form';

interface _props {}

interface _state {
  testId: number;
  textA: string;
  optionA: number;
}

export default function TestControl(props: _props) {
  const _initialState: _state = {
    testId: 0,
    textA: '',
    optionA: 0
  };

  const [state, setState] = useState(_initialState);

  function updateState(vals) {
    setState(prevState => {
      return { ...prevState, ...vals };
    });
  }

  const { register, handleSubmit, errors, setValue } = useForm();

  function _handleTextUserInputChange(e) {
    updateState({ [e.target.name]: e.target.value });
  }
  function _handleSelectUserInputChange(e) {
    //for select controls, call the setValue function
    setValue(e.target.name, Number(e.target.value), true);

    if (e.target.value === '') updateState({ [e.target.name]: null });
    else updateState({ [e.target.name]: Number(e.target.value) });
  }

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <h1>Input validation</h1>
      <FormGroup>
        <input
          type="text"
          className="form-control"
          name="textA"
          placeholder="Please enter some text here"
          defaultValue={state.textA}
          onChange={_handleTextUserInputChange}
          ref={register({ required: true })}
        />
        <div id="nameError" className="invalid-input">
          {errors.textA && 'This field is required'}
        </div>
      </FormGroup>

      <FormGroup>
        <select
          className="form-control"
          name="optionA"
          onChange={_handleSelectUserInputChange}
          defaultValue={state.optionA.toString()}
          ref={register({ required: true })}
        >
          {/* For the hidden option, value should be empty string for validation to work */}
          <option value="">Hidden option</option>
          <option key="1" value="1">
            Option A
          </option>
          <option key="2" value="2">
            Option B
          </option>
          <option key="3" value="3">
            Option C
          </option>
        </select>
        <div id="optionAError" className="invalid-input">
          {errors.optionA && 'Option A is required'}
        </div>
      </FormGroup>
      <button type="submit">Submit</button>
    </form>
  );

  function formSubmit(e) {}
}
