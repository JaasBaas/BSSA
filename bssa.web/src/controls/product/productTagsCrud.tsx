import React from 'react';
import * as api from '../../api/productApi';
import { productTag } from '../../api/viewModel/productTag';
import { Container, Col, Row, Badge, Input, Button } from 'reactstrap';
import { productTagListItem } from '../../api/viewModel/productTagListItem';
// import { Table, Row, Col, InputGroup, Input, Button } from "reactstrap";

/**ProductTagsCrud Properties */
interface _props {
  /**Product ID route parameter */
  productId: number;
}

/**ProductTagsCrud State Definition */
interface _state {
  isBusy: boolean;
  items: productTagListItem[];
  newItem: productTag;
}

const spanStyle = {
  border: '5px solid pink'
};

export class ProductTagsCrud extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isBusy: true,
    items: [],
    newItem: api.emptyProductTag()
  });

  state = this._initialState(this.props);

  componentDidMount() {
    api.GetProductTags(this.props.productId).then(d => {
      this.setState(s => ({ isBusy: false, items: d.data }));
    });
  }

  render() {
    return (
      <React.Fragment>
        <h5>Product Tags</h5>
        <hr className="mt-0" />
        <span>{this.renderTags()}</span>
      </React.Fragment>
    );
  }

  renderTags() {
    const x = this.state.items.map(i => this.renderTag(i));

    return x;
  }
  renderTag(tag: productTagListItem) {
    return (
      <span
        key={`tag${tag.tagId}`}
        className="border rounded p-1 mr-2 mb-2 d-inline-block"
      >
        <Input type="checkbox" className="ml-1 mr-1 position-relative"></Input>
        {tag.tagName}
        <img
          src="/icons/icons8-delete-bin-32.png"
          alt="Delete"
          width="20"
        ></img>
      </span>
    );
  }
}
