// import React, { Component } from "./node_modules/react";
import React, { Component } from "react";
import * as api from "../api/product";

export class productIndex extends Component {
  static displayName = productIndex.name;

  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }

  async getProductData() {
    try {
      const data = await api.getProductIndexSearchResults("bix");
      this.setState({ items: data, loading: false });
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getProductData();
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em> Loading... </em>
      </p>
    ) : (
      this.renderProductTable()
    );

    return (
      <div>
        <h4> Products </h4>
        {contents}
      </div>
    );
  }

  renderProductTable() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th> New </th>
            <th> Product </th> <th> Brand </th> <th> Variations </th>
          </tr>
        </thead>
        <tbody>
          {/* {items.map(forecast => (
            <tr key={forecast.ProductId}>
              <td> {forecast.ProductName} </td>
              <td> {forecast.ManufacturerName} </td>
              <td> {forecast.ProductVariationCount} </td> <td> </td>
            </tr>
          ))} */}
          {this.state.items.map((item, key) => (
            <tr key={item.productId}>
              <td> Buttons </td>
              <td> {item.productName} </td>
              <td> {item.brandName} </td>
              <td> {item.productVariationCount} </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
