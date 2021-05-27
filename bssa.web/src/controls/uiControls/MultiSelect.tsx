import React from 'react';
import ReactSelect, { StylesConfig } from 'react-select';
// import * as rs from 'react-select';

interface _props {
    options: any;
    selectedOptions?: any;
    onSelectionChange?: any;
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

export function MultiSelect(props: _props) {
    return (
        <React.Fragment>
            <ReactSelect
                styles={customStyles}
                options={props.options}
                hideSelectedOptions
                isMulti={true}
                closeMenuOnScroll={false}
                onChange={props.onSelectionChange}
            />
        </React.Fragment>
    );
}