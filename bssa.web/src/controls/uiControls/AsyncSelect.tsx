import { time } from 'console';
import React, { useState } from 'react';
// import { FormGroup } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import ReactAsyncSelect from 'react-select/async';
import { setTimeout } from 'timers';
import * as api from '../../api/storeApi';

interface _props {
  // options: any;
  // onSelectionChange: any;
  loadOptions: any;
  optionLabel: any;
  optionValue: any;
  onInputChange: any;
  id: string;
  //options: any;
}

interface _state {
  selectedItem: string;
  selectedItems: any;
}

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--inputControlBackgroundColor)',
    borderWidth: '0px',
    borderColor: 'transparent',
    boxShadow: state.isFocused ? 'var(--boxShadow)' : ''
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--inputControlBackgroundColor)',
    //color: 'var(--textColorSecondary)',
    color: 'red',
    marginTop: '5px',
    boxShadow: 'var(--boxShadow)'
  }),
  option: (provided, state) => ({
    ...provided,
    //backgroundColor: 'var(--inputControlBackgroundColor)',
    backgroundColor: state.isFocused
      ? 'var(--highlighted)'
      : 'var(--inputControlBackgroundColor)',
    //color: state.isFocused ? 'black' : 'var(--textColorSecondary)'
    color: 'var(--textColorSecondary)'
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--pageBackgroundColor)'
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--pageBackgroundColor)',
    color: 'var(--textColorSecondary)'
  }),
  multiValueRemove: (provided, state) => ({
    backgroundColor: 'var(--pageBackgroundColor)',
    color: 'red',
    cursor: state.isFocused ? 'busy' : 'pointer'
  })
};

export default function AsyncSelect(props: _props) {

  const _initialState: _state = {
    selectedItem: '',
    selectedItems: []
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
  /*
  function _handleSelectUserInputChange(e) {
    //for select controls, call the setValue function
    setValue(e.target.name, Number(e.target.value), true);

    if (e.target.value === '') updateState({ [e.target.name]: null });
    else updateState({ [e.target.name]: Number(e.target.value) });
  }
  */
  const loadOptions = async (inputValue) => {
    console.log(`Async Select Search Criteria = ${inputValue}`);
    if (!inputValue || inputValue.length < 3)
      return [];

    const timer = setTimeout(() => props.loadOptions, 1000);
    return () => clearTimeout(timer);
    // console.log(`Searching retailer stores ${inputValue}`);
    // let response = await api.SearchRetailerStores(state.retailerIds, inputValue);
    // return response.data;
  }
  // const optionValue = (option: storeIndex) => option.storeId.toString();
  // const optionLabel = (option: storeIndex) => option.storeName;

  return (
    <React.Fragment>
      {/* <Select
        styles={customStyles}
        options={props.options}
        hideSelectedOptions
        isMulti={true}
        closeMenuOnScroll={false}
        onChange={props.onSelectionChange}
      /> */}
      <ReactAsyncSelect
        id={props.id}
        loadOptions={loadOptions}
      //cacheOptions

      // options={props.options}
      //onInputChange={props.onInputChange}
      // getOptionLabel={props.optionLabel} 
      // getOptionValue={props.optionValue}
      />
    </React.Fragment>
  );
}
