import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';

import * as api from '../../api/productApi';
import { productIndex } from '../../api/viewModel/productIndex';

interface ProductSearchProps {}

interface ProductSearchState {
  isLoading: boolean;
  searchCriteria: string;
  items: productIndex[];
}

export class ProductSearch extends React.Component<
  ProductSearchProps,
  ProductSearchState
> {
  constructor(props: Readonly<ProductSearchProps>) {
    super(props);
    this.state = { items: [], isLoading: false, searchCriteria: '' };

    this.searchFormSubmit = this.searchFormSubmit.bind(this);
  }

  render() {
    let contents = this.state.isLoading ? (
      <p>
        <em> Loading... </em>
      </p>
    ) : (
      ProductSearch.renderSearchResults(this.state.items)
    );

    return (
      <Container>
        <Row>
          <Col sm="1">
            <a href="./Edit/0">
              <img src="/icons/icons8-add-32.png" alt="Add" width="20"></img>
            </a>
          </Col>
          <Col>
            <h5>Product Search</h5>
          </Col>
          <Col>
            <form onSubmit={this.searchFormSubmit}>
              <InputGroup>
                <Input
                  placeholder="Enter some search criteria  here"
                  defaultValue={this.state.searchCriteria}
                  onChange={this._handleUserInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button color="" size="sm" type="submit">
                    <img
                      src="/icons/icons8-search-32.png"
                      width="20"
                      alt="search"
                    />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <hr className="mt-2" />
        {contents}
      </Container>
    );
  }

  _handleUserInputChange = e => {
    this.setState({ searchCriteria: e.target.value });
  };

  searchFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState(s => ({ isLoading: true, items: [] }));

    api.GetProductSearchResults(this.state.searchCriteria).then(d => {
      this.setState(s => ({ isLoading: false, items: d.data }));
    });
  }

  static renderSearchResults(items: productIndex[]) {
    return items.map(i => (
      <Row key={i.productId}>
        <Col sm="1">
          <a href={`./Edit/${i.productId}`}>
            <img src="/icons/icons8-edit-32.png" alt="Edit" width="20"></img>
          </a>
        </Col>
        <Col>{i.brandName}</Col>
        <Col>{i.productName}</Col>
      </Row>
    ));
  }
}
