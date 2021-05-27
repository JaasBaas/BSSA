import React from 'react';
import * as ui from '../../controls/uiControls/uiControls';
import ReactSelect from 'react-select';
import { Container } from 'reactstrap';

interface _props { }

interface _state {
    isLoading: boolean;
    //   searchCriteria: string;
    //   items: productIndex[];
}

export class TestListCrud extends React.Component<_props, _state> {
    constructor(props: Readonly<_props>) {
        super(props);
        this.state = { isLoading: false };
    }

    render() {
        return (
            <Container>

            </Container>
        );
    }

    _handleUserInputChange = e => {
        //this.setState({ searchCriteria: e.target.value });
    };

    searchFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        this.setState(s => ({ isLoading: true, items: [] }));

        // api.GetProductSearchResults(this.state.searchCriteria).then(d => {
        //     this.setState(s => ({ isLoading: false, items: d.data }));
        // });
    }
}
