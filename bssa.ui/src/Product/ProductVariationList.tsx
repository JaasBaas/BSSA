import React from "react";
import * as api from "../Api/ProductApi";
import { Table, Row, Col, InputGroup, Input, Button } from "reactstrap";

/**ProductEditForm Properties */
interface _props {
  /**Product ID route parameter */
  productId: number;
}

/**ProductEditForm State Definition */
interface _state {
  isBusy: boolean;
  items: api.ProductVarianceIndex[];
  newItem: api.ProductVariance;
}

export class ProductVariationCrud extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isBusy: true,
    items: [],
    newItem: api.emptyProductVariance()
  });

  state = this._initialState(this.props);

  render() {
    return (
      <Table>
        {this._renderList()}
        {this._renderAdd()}
      </Table>
    );
  }

  _renderList() {
    return this.state.items.map(i => (
      <Row>
        <Col>
          {i.Measure} {i.MeasureUnit} {i.VarianceName}
        </Col>
      </Row>
    ));
  }

  _renderAdd() {
    return (
      <React.Fragment>
        <Row><Col><h5>Product Variations</h5><hr className="mt-2" /></Col></Row>
        <Row>
          <Col>
            <InputGroup>
              <Input
                id="Measure"
                type="text"
                placeholder="e.g. 500"
                onChange={this._handleUserInputChange}
                defaultValue={(this.state.newItem.Measure || '').toString()}
              />
              <Input
                type="select"
                id="MeasureUnitId"
                defaultValue={(this.state.newItem.MeasureUnitId || '').toString()}
                onChange={this._handleUserInputChange}
                placeholder="e.g. ggg"
              >
                <option value="">e.g. gram (g)</option>
                <option value="1">gram (g)</option>
                <option value="2">kilogram (kg)</option>
                <option>each</option>
                <option>litre (l)</option>
                <option>millilitre (ml)</option>
                <option>six-pack</option>
              </Input>
              <Input
                id="VarianceName"
                type="text"
                placeholder="optional description"
                onChange={this._handleUserInputChange}
                defaultValue={this.state.newItem.VarianceName}
              />
              <Button onClick={this._createNewProductVariation}>Create</Button>
            </InputGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  _handleUserInputChange = e => {
    return this.setState({ newItem: { ...this.state.newItem, [e.target.name]: e.target.value } });
  };

  _createNewProductVariation = () => {
    var ni = this.state.newItem;
  };
}
