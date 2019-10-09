import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Spinner, FormGroup } from 'reactstrap';
import * as api from '../../api/productApi';
import { brand } from '../../api/viewModel/brand';
import * as brandApi from '../../api/brandApi';
import { product } from '../../api/viewModel/product';
import useForm from 'react-hook-form';
import { async } from 'q';

/**ProductEditForm Properties */
interface _props {}

/**ProductEditForm State Definition */
interface _state {
  testId: number;
  textA: string;
  optionA: number | null;
}

export default function TestControl(props: _props) {
  const _initialState: _state = {
    testId: 0,
    textA: '',
    optionA: null
  };

  const [state, setState] = useState(_initialState);

  function updateState(vals) {
    setState(prevState => {
      return { ...prevState, ...vals };
    });
  } //

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

  //componentDidMount logic
  // useEffect(() => {
  //   const fetchData = async () => {
  //     brandApi.GetLookup().then(r => {
  //       updateState({ brands: r.data });
  //     });
  //   };

  //   fetchData();
  // }, []);

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
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
          defaultValue="" //state.optionA !== null ? state.optionA.toString() : '0'}
          ref={register({ required: true })}
        >
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
