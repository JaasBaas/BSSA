import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import TestControl from './testControl';
import ReactSelects from './reactSelects';
import { RouteComponentProps } from 'react-router-dom';
// import * as Button from '../../controls/uiControls/button';
import * as ui from '../../controls/uiControls/uiControls';
import Select from 'react-select';

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

  _provinces = [
    { value: '1', label: 'Gauteng' },
    { value: '2', label: 'Eastern Cape' },
    { value: '3', label: 'Western Cape' },
    { value: '4', label: 'Kwa-Zulu Natal' },
    { value: '5', label: 'Mpumalanga' }
  ];

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
        <Row>
          <Col>
            <ReactSelects options={this._provinces} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div>This is my option text</div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
