import React, { useState } from 'react';
import { FormGroup } from 'reactstrap';
import useForm from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';

interface _props {
  options: any;
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

export default function TestControl(props: _props) {

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
  function _handleSelectUserInputChange(e) {
    //for select controls, call the setValue function
    setValue(e.target.name, Number(e.target.value), true);

    if (e.target.value === '') updateState({ [e.target.name]: null });
    else updateState({ [e.target.name]: Number(e.target.value) });
  }

  return (
    <React.Fragment>
      <Select
        styles={customStyles}
        options={props.options}
        hideSelectedOptions
        isMulti={true}
        closeMenuOnScroll={false}
      />
    </React.Fragment>
  );
}
