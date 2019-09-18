import React from "react";
import { InputGroup, InputGroupAddon, Input, Button, Container, Row, Col } from "reactstrap";
import * as api from "../Api/ProductApi";
import { ProductIndex } from "../Api/ViewModel/ProductIndex";

interface ProductSearchProps { }

interface ProductSearchState {
  isLoading: boolean;
  searchCriteria: string;
  items: ProductIndex[];
}

export class ProductSearch extends React.Component<ProductSearchProps, ProductSearchState> {
  constructor(props: Readonly<ProductSearchProps>) {
    super(props);
    this.state = { items: [], isLoading: false, searchCriteria: "" };

    this.searchButtonClick = this.searchButtonClick.bind(this);
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
          <Col>
            <h5>Product Search</h5>
          </Col>
          <Col>
            <InputGroup>
              <Input placeholder="Enter some search criteria here" defaultValue={this.state.searchCriteria} onChange={this._handleUserInputChange} />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={this.searchButtonClick}>
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        {contents}
        {this.renderCommands()}
      </Container>
    );
  }

  _handleUserInputChange = e => {
    this.setState({ searchCriteria: e.target.value });
  };

  searchButtonClick() {
    this.setState(s => ({ isLoading: true, items: [] }));

    api.GetProductSearchResults(this.state.searchCriteria)
      .then(d => {
        this.setState(s => ({ isLoading: false, items: d.data }));
      });

  }

  static renderSearchResults(items: ProductIndex[]) {
    return items.map(i => (
      <Row key={i.productId}>
        <Col>{i.productName}</Col>
        <Col>{i.brandName}</Col>
      </Row>
    ));
  }

  // newButtonClick() {
  //     history.pushState(null, "", "./Product/Edit/0");
  // }

  // editButtonClick() {
  //     history.pushState(null, "", "./Product/Edit/1");
  // }

  renderCommands() {
    return (
      <Row>
        <Col>
          <a href="./Edit/0">New</a>{" "}
        </Col>
        <Col>
          <Button color="primary">Edit</Button>
        </Col>
      </Row>
    );
  }
}
