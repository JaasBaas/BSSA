import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import AsyncSelect from '../../controls/uiControls/AsyncSelect';
import * as storeApi from '../../api/storeApi';
import { storeIndex } from '../../api/viewModel/storeIndex';
import ReactSelect, { StylesConfig } from 'react-select';
import { SelectDelayLoad } from '../../controls/uiControls/select';

interface _props { }

interface _state {
    testId: number;
    textA: string;
    optionA: number;
    storeSearchCriteria: string;
    storeSearchResults: any;
    reactSelectTimer: any;

    reactSelectText: string;
    reactSelectOptions: any;
}

export default function TestSelectPage(props: _props) {
    const _initialState: _state = {
        testId: 0,
        textA: '',
        optionA: 0,
        storeSearchCriteria: "",
        storeSearchResults: [],
        reactSelectTimer: null,
        reactSelectText: "",
        reactSelectOptions: []
        //     { value: 1, label: 'Store A' },
        //     { value: 2, label: 'Store B' },
        // ]
    };

    const [state, setState] = useState(_initialState);

    function updateState(vals) {
        setState(prevState => {
            return { ...prevState, ...vals };
        });
    }

    const { register, handleSubmit, errors, setValue } = useForm();

    const loadOptionsAsync = async (inputValue: string) => {
        console.log(`Searching retailer stores ${inputValue}`);
        let response = await storeApi.SearchRetailerStores([1], inputValue);
        return response.data;
    }
    const optionValue = (option: storeIndex) => option.storeId.toString();
    const optionLabel = (option: storeIndex) => option.storeName;

    function handleInputChangeAsyncLookup(newValue: string) {
        console.log(`Async Lookup Input Change = ${newValue}`);
        //updateState({ storeSearchCriteria: newValue });
    };

    function handleInputChangeReactSelect(newValue: string) {
        if (!newValue || newValue.length < 3)
            return;

        console.log(`React Select Lookup Input Change = ${newValue}`);
        /*
                if (state.reactSelectTimer) {
                    console.log(`Clear React Select Timer`);
                    clearTimeout(state.reactSelectTimer);
                }
        
                console.log(`Set Timer`);
                const timer = setTimeout(() => { createReactSelectData() }, 5000);
                updateState({ reactSelectTimer: timer });
        */
        // if (newValue.length > 0)
        // createReactSelectData();
        const timer = setTimeout(() => { createReactSelectData() }, 500);
    };

    function ReactSelectButtonClick(event: React.MouseEvent<any, MouseEvent>) {
        console.log(`React Select button clicked`);
        const timer = setTimeout(() => { createReactSelectData() }, 5000);
        // return () => clearTimeout(timer);
    };

    function createReactSelectData() {
        console.log(`Loading data`);
        let data = [
            { value: 1, label: 'Store A' },
            { value: 2, label: 'Store B' },
        ];
        updateState({ reactSelectOptions: data });
        console.log(`State.reactSelectOptions updated with ${data.length} options.`);
    }
    function createStoreData2(newValue: string) {
        console.log(`Loading data in test page`);
        let data = [
            { value: 1, label: 'Store A' },
            { value: 2, label: 'Store B' },
        ];
        updateState({ storeSearchResults: data });
    }

    return (
        <Container>
            <Row><Label>My Async Select</Label></Row>
            <Row className="pb-2">
                <Col>
                    <AsyncSelect id="storeSelectA"
                        loadOptions={loadOptionsAsync}
                        optionLabel={optionLabel} optionValue={optionValue}
                        onInputChange={handleInputChangeAsyncLookup}
                    />
                </Col>
            </Row>
            <Row><Label>React Select</Label></Row>
            <Row className="pb-2">
                <Col>
                    <ReactSelect id="storeSelectB"
                        options={state.reactSelectOptions}
                        onInputChange={handleInputChangeReactSelect}
                        styles={customStyles}
                        isSearchable={true}

                    />

                </Col >
                <Col><Button onClick={ReactSelectButtonClick} value="Load Options" /></Col>
            </Row>
            <Row>
                <Col>
                    <SelectDelayLoad id="storeSelectC"
                    // options={state.storeSearchResults}
                    // handleSelectDelayLoad={createStoreData2}
                    // isSearchable={true}
                    // minSearchCriteriaLengh={3}
                    // loadDelay={5000}
                    />
                </Col >
            </Row>
        </Container>
    );
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
        color: state.isFocused ? 'black' : 'var(--textColorSecondary)'
        // fontSize: 24
        //color: 'var(--textColorSecondary)',

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
