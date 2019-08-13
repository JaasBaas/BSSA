// import React, { Component } from "./node_modules/react";
import React, { Component } from "react";
import api from "../axios/api";

export class productIndex extends Component {
  static displayName = productIndex.name;

  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }

  async getProductData() {
    try {
      const response = await api.get("http://localhost:5000/api/values");
      //const data = await response.json();
      this.setState({ items: response.data, loading: false });
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
        <h1> Products </h1>
        {contents}
      </div>
    );
  }

  renderProductTable() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th> Date </th> <th> Temp.(C) </th> <th> Temp.(F) </th>
            <th> Summary </th>
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
            <tr key={item.ProductId}>
              <td> {item.ProductName} </td>
              <td> {item.ManufacturerName} </td>
              <td> {item.ProductVariationCount} </td> <td> </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
