import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import TestControl from './testControl';
import { RouteComponentProps } from 'react-router-dom';
// import * as Button from '../../controls/uiControls/button';
import * as ui from '../../controls/uiControls/uiControls';

interface _props {
  productId: number;
}

interface _state {
  isLoading: boolean;
  productId: number;
}

const initialState: _state = { isLoading: false, productId: 0 };

type _params = { id: string };

export class TestPage extends React.Component<
  _props & RouteComponentProps<_params>,
  _state
> {
  constructor(props) {
    super(props);

    var s = initialState;
    s.productId = this.props.productId;

    this.state = s;
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="4">
            <TestControl></TestControl>
          </Col>
          <Col sm="4">
            <h1>Buttons</h1>
            <ui.Button value="Button" />
            <ui.ButtonWarning value="Warning" />
            <ui.ButtonDanger value="Danger" />
            <ui.ButtonSuccess value="Success" />
            <ui.ButtonDanger disabled value="Disabled" />
            <ui.ButtonDelete />
          </Col>
          <Col sm="4">
            <h1>Tags</h1>
            <ui.Tag
              deleteButtonVisible="true"
              checkBoxVisible="true"
              value="Default Tag"
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
