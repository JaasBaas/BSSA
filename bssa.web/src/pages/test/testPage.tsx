import React from 'react';
import { Row, Col } from 'reactstrap';
import ProductEditForm from '../../controls/product/productEditForm';
import TestControl from './testControl';
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

export class TestPage extends React.Component<
  _props & RouteComponentProps<_params>,
  _state
> {
  constructor(props) {
    super(props);

    var s = initialState;
    s.productId = Number.parseInt(this.props.match.params.id);

    this.state = s;

    // this.OnProductSaved = this.OnProductSaved.bind(this);
  }

  // componentDidMount() {
  //     if (this.props.productId !== 0) {
  //         var data = api.GetProduct(this.props.productId);
  //         this.setState(s => ({ isLoading: false, item: data }));
  //     }
  // }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12" md="6" lg="4">
            <TestControl></TestControl>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
