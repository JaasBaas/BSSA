import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, Input } from 'reactstrap';
// import ReactSelect, { StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import * as ui from '../../controls/uiControls/uiControls';
import * as api from '../../api/storeApi';
import { lookup, lookupDetail } from '../../api/viewModel/lookup';
import { Tag } from '../../controls/uiControls/tag';
import { stat } from 'fs';
import { storeIndex } from '../../api/viewModel/storeIndex';

interface _props {
    specialId: number;
    retailerIds: number[];
    /**Product Saved callback method */
    //OnProductSaved: (productId: number) => void;
}

interface _state {
    isLoading: boolean;
    isSuccess: boolean;
    specialId: number;
    options: lookupDetail[];
    searchCriteria: string;
    retailerIds: Number[];
}

/*
Scenario 1:  
Prices apply to stores in Gauteng, Brits, Klerksdorp, Limpopo, Mpumalanga except Mafikeng & Lichtenburg

Scenario 2:  
Prices apply to stores in Betlehem, De Aar, Diamond Pavilion, Goldfields, Hartswater, Halahari Mall
*/

export default function SpecialStoresCrud(props: _props) {
    const _initialState: _state = {
        isLoading: true,
        isSuccess: false,
        specialId: props.specialId,
        options: [],
        searchCriteria: "",
        retailerIds: props.retailerIds
    };

    const [state, setState] = useState(_initialState);

    function updateState(vals) {
        setState(prevState => {
            return { ...prevState, ...vals };
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            if (state.specialId !== 0)
                api.GetSpecialStoresLookupDetail(state.specialId).then(r => {
                    updateState({ isLoading: false, stores: r.data });
                });
            else {
                updateState({ isLoading: false });
            }
        };

        console.log('Fetching store data...');
        fetchData();
    }, [state.specialId]);

    const storeLookupOptionValue = (option: storeIndex) => option.storeId.toString();
    const storeLookupOptionLabel = (option: storeIndex) => option.storeName;


    const filterStores = (inputValue: string) => {
        console.log(`Search criteria = ${inputValue}`);
        if (inputValue.length >= 3) {
            console.log(`Searching retailer stores ${inputValue}`);
            let x = api.SearchRetailerStores(state.retailerIds, inputValue);
            return x;
        }
        return null;
    };
    /*
        const loadOptions = inputValue =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(filterStores(inputValue));
                }, 5000);
            });
    */
    //    async function loadOptions(inputValue) {
    const loadOptions = async (inputValue) => {
        console.log(`Search criteria = ${inputValue}`);
        if (!inputValue || inputValue.length < 3) return [];

        console.log(`Searching retailer stores ${inputValue}`);
        let response = await api.SearchRetailerStores(state.retailerIds, inputValue);
        return response.data;
    }

    function handleInputChange(newValue: string) {
        console.log(`Updating state = ${newValue}`);
        updateState({ storeSearchCriteria: newValue });
    };

    return (
        <Card key="specialStoresCard">
            <CardBody key="specialStoresCardBody">
                <CardTitle key="newCardTitle">{renderNewStoreLookup()}</CardTitle>

                {state.options.map(i => renderProvinceCard(i))}
            </CardBody>
        </Card>
    );

    function renderNewStoreLookup() {
        return (
            <AsyncSelect cacheOptions loadOptions={loadOptions} onInputChange={handleInputChange}
                getOptionLabel={storeLookupOptionLabel} getOptionValue={storeLookupOptionValue}
            />
        );
    };

    function renderProvinceCard(province: lookupDetail) {
        return (
            <React.Fragment>
                <CardTitle key={province.id}>{province.value}</CardTitle>
                <CardText key={province.id} className="">
                    {renderProvinceStores(province.children)}
                </CardText>
            </React.Fragment>
        );
    };

    function renderProvinceStores(stores: lookup[]) {
        return (
            stores.map(i => renderProvinceStore(i))
        );
    }
    function renderProvinceStore(store: lookup) {
        return (
            <Tag key={store.id} value={store.value} checkBoxVisible={false} deleteButtonVisible={true}
                onDeleteClick={tagDeleteClick} />
        )
    }
    function tagDeleteClick(e: any) {
        alert('delete button clicked');
    }

}