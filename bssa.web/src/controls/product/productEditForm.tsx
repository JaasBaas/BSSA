import React from 'react';
import { Input, Button, Form, Spinner } from 'reactstrap';
import * as api from '../../api/productApi';
import { brand } from '../../api/viewModel/brand';
import * as brandApi from '../../api/brandApi';
import { product } from '../../api/viewModel/product';

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
  product: product;
  brands: brand[];
}

export class ProductEditForm extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isLoading: props.productId !== 0,
    isSuccess: false,
    productId: props.productId,
    product: api.emptyProduct(),
    brands: []
  });

  state = this._initialState(this.props);

  componentDidMount() {
    brandApi.GetLookup().then(r => {
      this.setState(s => ({ brands: r.data }));
    });

    if (this.state.productId !== 0)
      api.GetProduct(this.state.productId).then(r => {
        this.setState(s => ({ isLoading: false, product: r.data }));
      });
    else this.setState(s => ({ isLoading: false }));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Product Detail</h1>
        <hr className="mt-0" />

        {this.state.isLoading ? this.renderSpinner() : this._renderForm()}
      </React.Fragment>
    );
  }

  _handleUserInputChange = e => {
    this.setState({
      product: { ...this.state.product, [e.target.name]: e.target.value }
    });
  };
  _handleBrandChange = e => {
    this.setState({
      product: { ...this.state.product, brandId: Number(e.target.value) }
    });
  };

  _save = () => {
    var p = this.state.product;
    var id = p.productId;

    if (id === 0) {
      api.InsertProduct(p).then(r => {
        id = r.data;
        this.setState({
          productId: id,
          product: { ...this.state.product, productId: id }
        });
        this.props.OnProductSaved(id);
        console.log('Product inserted');
      });
    } else {
      api
        .UpdateProduct(p)
        .then(r => {
          this.props.OnProductSaved(id);
          console.log('Product updated');
        })
        .catch(function(error) {
          console.log('Error', error.message);
        });
    }
  };

  renderSpinner() {
    return (
      <div>
        <Spinner color="primary" size="sm" />
        Loading...
      </div>
    );
  }

  _renderForm() {
    return (
      <Form>
        {/* <Input hidden vdealue={this.state.productId} /> */}
        <div className="row mb-2">
          <div className="col">
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Product name"
              defaultValue={this.state.product.name}
              onChange={this._handleUserInputChange}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-10">{this._renderBrandLookup()}</div>
          <div className="col-2">
            <Button onClick={this._save}>
              {this._renderUpdateButtonText()}
            </Button>
          </div>
        </div>
        {/* </FormGroup> */}
      </Form>
    );
  }

  _renderUpdateButtonText() {
    return this.state.productId === 0 ? 'Create' : 'Update';
  }

  _renderBrandLookup() {
    return (
      <Input
        type="select"
        name="brandId"
        id="brandId"
        onChange={this._handleBrandChange}
        defaultValue={
          this.state.product.brandId === 0
            ? ''
            : this.state.product.brandId.toString()
        }
      >
        {this._renderhiddenOption()}
        {this._renderLookupOptions()}
      </Input>
    );
  }
  _renderhiddenOption() {
    if (this.state.product.brandId === 0)
      return (
        <option key="0" selected disabled hidden>
          Brand Name
        </option>
      );
  }

  _renderLookupOptions() {
    return this.state.brands.map((item, key) => (
      <option key={item.brandId} value={item.brandId.toString()}>
        {item.brandName}
      </option>
    ));
  }
}
