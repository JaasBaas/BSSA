import React, { useState } from 'react';
import ReactSelect, { InputActionMeta, StylesConfig } from 'react-select';


interface _props {
    id?: string;
    // options: any;
    // selectedOptions?: any;
    // hideSelectedOptions?: boolean;
    // isMulti?: boolean;
    // closeMenuOnScroll?: boolean | EventListener;
    // isSearchable?: boolean;


    onSelectionChange?: any;
    // onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;


    //Delay loading data for x milliseconds
    // loadDelay: number;
    // //Minimum number of characters for search criteria
    // minSearchCriteriaLengh: number;
    // // Executed after the delay expired
    // handleSelectDelayLoad: any;
}

interface SelectDelayLoadState {
    timer: any;
    options: any;
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


export function SelectDelayLoad(props: _props) {
    const _initialState: SelectDelayLoadState = {
        timer: null,
        options: []
    };

    const [state, setState] = useState(_initialState);

    function updateState(vals) {
        setState(prevState => {
            return { ...prevState, ...vals };
        });
    }

    function handleSelectDelayInputChange(searchCriteria: string) {
        console.log(`Handle Select Delay Input Change... ${searchCriteria}`);

        if (searchCriteria.length < 3)
            return null;

        /*
    if (state.timer) {
        console.log(`Clear Timer`);
        clearTimeout(state.timer);
    }

    console.log(`Set Timer`);
    const t = setTimeout(() => { loadOptions() }, 5000);
    updateState({ timer: t });
    */
        loadOptions();
    };

    function loadOptions() {
        console.log(`Loading data`);
        let data = [
            { value: '1', label: 'Store A' },
            { value: '2', label: 'Store B' },
        ];
        updateState({ options: data });
        console.log(`State updated with ${data.length} options.`);
    }

    return (
        <ReactSelect
            id={props.id}
            styles={customStyles}
            options={state.options}
            //hideSelectedOptions={props.hideSelectedOptions}
            //isMulti={props.isMulti}
            //closeMenuOnScroll={props.closeMenuOnScroll}
            //onChange={props.onSelectionChange}
            onInputChange={handleSelectDelayInputChange}
            isSearchable={true}
        />
    );
}