import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
// import { RouteComponentProps } from 'react-router-dom';
// import { func } from 'prop-types';
// import * as ui from '../../controls/uiControls/uiControls';
import Select from 'react-select';
import { lookup } from '../../api/viewModel/lookup';

interface _props {
  specialId: number;
}

interface _state {
  isLoading: boolean;
  specialId: number;
  selectedRetailers: number[];
  availableRetailers: lookup[];
  selectedCardNo: number;
}

type _params = { id: string };

export default function CatalogueEditPage(props: _props) {
  const initialState: _state = {
    isLoading: false,
    specialId: props.specialId,
    selectedRetailers: [],
    availableRetailers: [],
    selectedCardNo: 1
  };
  const [state, setState] = useState(initialState);
  function updateState(vals) {
    setState(prevState => {
      return { ...prevState, ...vals };
    });
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm="12" md="4" lg="4">
          {renderRetailerCard()}
        </Col>
        <Col sm="12" md="4" lg="4">
          {renderStoreCard()}
        </Col>
        <Col sm="12" md="4" lg="4">
          {renderSpecialCard()}
        </Col>
      </Row>
      <Row>
        <Col sm="12">{renderRetailerCrud()}</Col>
      </Row>
    </React.Fragment>
  );

  function renderRetailerCard() {
    return (
      <Card onClick={retailerCardEditClick}>
        <CardBody>
          <CardTitle>Retailer(s)</CardTitle>
          <CardText>Checkers and Checkers Hyper</CardText>
        </CardBody>
      </Card>
    );
  }

  function retailerCardEditClick(e) { }

  function renderRetailerCrud() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Retailer(s)</CardTitle>
          <CardText>
            <Select
              value={state.selectedRetailers}
              options={state.availableRetailers}
            />
          </CardText>
        </CardBody>
      </Card>
    );
  }

  function renderStoreCard() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Stores</CardTitle>
          <CardText>26 stores in 2 provinces</CardText>
        </CardBody>
      </Card>
    );
  }
  function renderSpecialCard() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Specials</CardTitle>
          <CardText>57 products on special from 15 to 25 October</CardText>
        </CardBody>
      </Card>
    );
  }
}
