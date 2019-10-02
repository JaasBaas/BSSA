import React, { FormEventHandler, FormEvent } from 'react';
import * as api from '../../api/productApi';
import { productTag } from '../../api/viewModel/productTag';
import {
  Container,
  Col,
  Row,
  Badge,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Form,
  FormProps,
  Label
} from 'reactstrap';
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
  newTag: string;
}

const spanStyle = {
  border: '5px solid pink'
};

export class ProductTagsCrud extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isBusy: true,
    items: [],
    newTag: ''
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
        <span>{this.renderNewTag()}</span>
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

  renderNewTag() {
    const newTagName = this.state.newTag;
    console.log(`renderNewTag.newTagName = ${newTagName}`);

    return (
      <Form onSubmit={this.newTagFormSubmit}>
        <InputGroup key="tag0" style={{ width: '300px' }}>
          <Input
            id="newTagName"
            type="text"
            placeholder="New tag"
            onChange={this.handleNewTagChange}
            value={newTagName}
          />
          <InputGroupAddon addonType="append">
            <Button>
              <img src="/icons/icons8-add-32.png" alt="Delete" width="20"></img>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    );
  }

  handleNewTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || '';
    this.setState({ newTag: value });
  };

  newTagFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.createNewTag();
  };
  async createNewTag() {
    const newTagName = this.state.newTag;

    await api.InsertProductTagName(this.props.productId, newTagName).then(r => {
      const newTag: productTagListItem = {
        productId: this.props.productId,
        tagId: r.data,
        tagName: newTagName,
        tagCategoryName: ''
      };

      this.state.items.push(newTag);
      this.setState({ newTag: '' });
      console.log('createNewTag.newTagName = ""');
    });
  }
}
