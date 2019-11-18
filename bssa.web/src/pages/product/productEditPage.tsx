import React from 'react';
import { Row, Col } from 'reactstrap';
import ProductEditForm from '../../controls/product/productEditForm';
import { RouteComponentProps } from 'react-router-dom';
import { ProductVariationCrud } from '../../controls/product/productVariationList';
import { ProductTagsCrud } from '../../controls/product/productTagsCrud';

interface _props {
  productId: number;
}

interface _state {
  isLoading: boolean;
  productId: number;
}

const initialState: _state = { isLoading: false, productId: 0 };

type _params = { id: string };

export class ProductEditPage extends React.Component<
  _props & RouteComponentProps<_params>,
  _state
> {
  constructor(props) {
    super(props);

    var s = initialState;
    s.productId = this.props.productId;

    this.state = s;

    // this.OnProductSaved = this.OnProductSaved.bind(this);
  }

  render() {
    return (
      <Row>
        <Col sm="12" md="6" className="mb-4">
          <ProductEditForm
            productId={this.state.productId}
            OnProductSaved={productId => this.OnProductSaved(productId)}
          />
        </Col>
        <Col sm="12" md="6" className="mb-4">
          {this._renderProductVariations()}
        </Col>
        <div className="w-100" />
        <Col>{this._renderProductTags()}</Col>
      </Row>
    );
  }

  _renderProductVariations() {
    if (this.state.productId > 0) {
      return <ProductVariationCrud productId={this.state.productId} />;
    }

    return null;
  }

  _renderProductTags() {
    // let detail: JSX.Element;
    if (this.state.productId > 0) {
      return <ProductTagsCrud productId={this.state.productId} />;
    }

    return null;
  }

  OnProductSaved(productId: number) {
    this.setState({ productId: productId });
  }
  // handleProductNameChange(event: { target: { name: any; value: any; }; }) {
  //     if (event == null || event.target == null)
  //         return;

  //     this.setState(s => s.item.ProductName = event.target.value);
  // }

  // handleBrandIdChange(event: { target: { name: any; value: any; }; }) {
  //     this.setState(s => s.item.BrandId = event.target.value);
  // }

  // handleBrandNameChange(event: { target: { name: any; value: any; }; }) {
  //     this.setState(s => s.item.BrandName = event.target.value);
  // }
}

//export default withRouter(ProductEditPage);
