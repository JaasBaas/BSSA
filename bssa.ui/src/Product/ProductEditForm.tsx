import React from "react";
import {
  Input,
  Button,
  Form
} from "reactstrap";
import * as api from "../Api/ProductApi";
import { Product, emptyProduct } from "../Api/ViewModel/Product";

/**ProductEditForm Properties */
interface _props {
  /**Product ID route parameter */
  productId: number;

  /**Product Saved callback method */
  OnProductSaved: (productId: number) => void;
}

/**ProductEditForm State Definition */
interface _state {
  isLoading: boolean;
  isSuccess: boolean;
  productId: number;
  product: Product;
}

export class ProductEditForm extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isLoading: props.productId !== 0,
    isSuccess: false,
    productId: props.productId,
    product: emptyProduct()
  });

  state = this._initialState(this.props);

  _handleUserInputChange = e => {
    return this.setState({ product: { ...this.state.product, [e.target.name]: e.target.value } });
  };

  _save = () => {
    var p = this.state.product;
    var r = api.UpdateProduct(p);
    if (r.success) {
      this.setState({ product: { ...this.state.product, productId: r.identity } });
      //this.setState(...this.state, ProductId: r.identity);

      //this.setState({this.state:{...this.state, productId:r.identity, product.productId:r.identity}});
      this.props.OnProductSaved(r.identity);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h5>Product Detail</h5>
        <hr className="mt-0" />
        <Form>
          <Input hidden value={this.state.productId} />
          {/* <FormGroup>
          <Label for="ProductName">Product Name</Label> */}
          <div className="row mb-2">
            <div className="col">
              <Input
                type="text"
                name="ProductName"
                id="ProductName"
                placeholder="Product name"
                defaultValue={this.state.product.name}
                onChange={this._handleUserInputChange}
              />
            </div>
          </div>
          {/* </FormGroup>
        <FormGroup>
          <Label for="BrandId">Brand</Label> */}
          <div className="row ">
            <div className="col-10">
              <Input
                type="select"
                name="BrandId"
                id="BrandId"
                defaultValue={this.state.product.brandId === null ? "" : this.state.product.brandId.toString()}
                onChange={this._handleUserInputChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </div>
            <div className="col-2">
              <Button onClick={this._save}>{this._renderUpdateButtonText()}</Button>
            </div>
          </div>
          {/* </FormGroup> */}
        </Form>
      </React.Fragment>
    );
  }

  _renderUpdateButtonText() {
    return this.state.productId === 0 ? "Create" : "Update";
  }
}
