import React from 'react';
import * as api from '../../api/productApi';
import { productTag } from '../../api/viewModel/productTag';
// import { Table, Row, Col, InputGroup, Input, Button } from "reactstrap";

/**ProductTagsCrud Properties */
interface _props {
  /**Product ID route parameter */
  productId: number;
}

/**ProductTagsCrud State Definition */
interface _state {
  isBusy: boolean;
  items: productTag[];
  newItem: productTag;
}

export class ProductTagsCrud extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isBusy: true,
    items: [],
    newItem: api.emptyProductTag()
  });

  state = this._initialState(this.props);

  render() {
    return (
      <React.Fragment>
        <h5>Product Tags</h5>
        <hr className="mt-0" />
      </React.Fragment>
    );
  }
}
