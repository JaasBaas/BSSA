import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { func } from 'prop-types';
import * as ui from '../../controls/uiControls/uiControls';

interface _props {
  specialId: number;
}

interface _state {
  isLoading: boolean;
  specialId: number;
  retailers: number[];
}

type _params = { id: string };

export default function CatalogueEditPage(props: _props) {
  const initialState: _state = {
    isLoading: false,
    specialId: props.specialId,
    retailers: []
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
        <Col sm="12">Editing area for special {state.specialId}</Col>
      </Row>
    </React.Fragment>
  );

  function renderRetailerCard() {
    return (
      <Card onClick={retailerCardEditClick}>
        <CardBody>
          <CardTitle>Retailers</CardTitle>
          <CardText>Checkers and Checkers Hyper</CardText>
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

  function retailerCardEditClick(e) {}
}
