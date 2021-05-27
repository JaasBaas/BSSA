import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, Input } from 'reactstrap';
// import { RouteComponentProps } from 'react-router-dom';
// import { func } from 'prop-types';
// import * as ui from '../../controls/uiControls/uiControls';
import Select from 'react-select';
import { lookup } from '../../api/viewModel/lookup';
import { ButtonEdit } from '../../controls/uiControls/button';
import SpecialStoresCrud from '../../controls/special/specialStoresCrud';
import { defaultProps } from 'react-select/src/Select';
import StateManager from 'react-select';
import { stat } from 'fs';

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
    isLoading: props.specialId !== 0,
    specialId: props.specialId,
    selectedRetailers: [1],
    availableRetailers: [],
    selectedCardNo: 2
  };
  const [state, setState] = useState(initialState);
  function updateState(vals) {
    setState(prevState => {
      return { ...prevState, ...vals };
    });
  }

  const loadData = async () => {
    // if (state.specialId > 0)
    // {
    //   let retailers = await fetch("https://api.agify.io/?name=michael");
    //   updateState({selectedRetailers: retailers});
    // }
  };

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
      <Row className="pt-3">
        <Col sm="12">{renderRetailerCrud()}</Col>
        <Col sm="12">{renderStoresCrud()}</Col>
        <Col sm="12">{renderSpecialsCrud()}</Col>
      </Row>
    </React.Fragment>
  );

  function renderRetailerCard() {
    return (
      <Card >
        <CardBody>
          <CardTitle>
            <table>
              <tr>
                <td width="100%">Retailer(s)</td>
                <td ><ButtonEdit onClick={retailerCardEditClick} /></td>
              </tr>
            </table>
          </CardTitle>
          <CardText>Checkers and Checkers Hyper</CardText>
        </CardBody>
      </Card>
    );
  }

  function retailerCardEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    updateState({ selectedCardNo: 1 });
  };

  function renderRetailerCrud() {
    if (state.selectedCardNo === 1) {
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
    };

    return null;
  }

  function renderStoreCard() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <table>
              <tr>
                <td width="100%">Stores</td>
                <td ><ButtonEdit onClick={storesCardEditClick} /></td>
              </tr>
            </table>
          </CardTitle>
          <CardText>26 stores in 2 provinces</CardText>
        </CardBody>
      </Card>
    );
  }

  function storesCardEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    updateState({ selectedCardNo: 2 });
  };

  function renderStoresCrud() {
    if (state.selectedCardNo === 2) {
      return (
        <SpecialStoresCrud specialId={state.specialId} retailerIds={state.selectedRetailers} />
      );
    };

    return null;
  }

  function renderSpecialCard() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <table>
              <tr>
                <td width="100%">Specials</td>
                <td ><ButtonEdit onClick={specialsCardEditClick} size="sm" /></td>
              </tr>
            </table>
          </CardTitle>
          <CardText>57 products on special from 15 to 25 October</CardText>
        </CardBody>
      </Card>
    );
  }

  function specialsCardEditClick() {
    updateState({ selectedCardNo: 3 });
  };


  function renderSpecialsCrud() {
    if (state.selectedCardNo === 3) {
      return (
        <Card>
          <CardBody>
            <CardTitle>
              <table>
                <tr>
                  <td width="50%">Products on Promotion</td>
                  <td ><Input type="text" bsSize="sm" /></td>
                </tr>
              </table>
            </CardTitle>
            <CardText>
            </CardText>
          </CardBody>
        </Card>
      );
    };

    return null;
  }
}
