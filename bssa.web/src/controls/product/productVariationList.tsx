import React from 'react';
import * as api from '../../api/productApi';
import { Row, Col, InputGroup, Input, Button, Container } from 'reactstrap';
import { productVariationListItem } from '../../api/viewModel/productVariationListItem';
import { productVariation } from '../../api/viewModel/productVariation';
import { measureUnitLookup } from '../../api/viewModel/measureUnitLookup';
import * as measureUnitApi from '../../api/measureUnitApi';

interface _props {
  productId: number;
}

interface _state {
  isBusy: boolean;
  items: productVariationListItem[];
  newItem: productVariation;
  measureLookupData: measureUnitLookup[];
}

export class ProductVariationCrud extends React.Component<_props, _state> {
  _initialState = (props: _props): _state => ({
    isBusy: true,
    items: [],
    newItem: api.emptyProductVariation(this.props.productId),
    measureLookupData: []
  });

  state = this._initialState(this.props);

  componentDidMount() {
    api.GetProductVariations(this.props.productId).then(r => {
      this.setState(s => ({ items: r.data }));
    });

    measureUnitApi.GetLookup().then(r => {
      this.setState(s => ({ measureLookupData: r.data }));
    });
  }

  render() {
    return (
      <Container>
        <Row key="header">
          <Col>
            <h5>Product Variations</h5>
            <hr className="mt-2" />
          </Col>
        </Row>
        <Row key="1">{this._renderList()}</Row>

        {this._renderAdd()}
      </Container>
    );
  }

  _renderList() {
    return this.state.items.map(i => (
      <Col key={i.productVariationId}>
        {i.measure} {i.measureUnitAbbr} {i.variationName}
      </Col>
    ));
  }

  _renderAdd() {
    return (
      <Row key="add">
        <Col>
          <InputGroup>
            <Input
              id="Measure"
              type="text"
              placeholder="e.g. 500"
              onChange={this._handleMeasureChange}
              defaultValue={(this.state.newItem.measure || '').toString()}
            />
            <Input
              type="select"
              id="MeasureUnitId"
              defaultValue={(this.state.newItem.measureUnitId || '').toString()}
              onChange={this._handleMeasureUnitChange}
              placeholder="e.g. gram"
            >
              {this._renderMeasureUnitLookupDefaultOption()}
              {this._renderMeasureUnitLookupOptions()}
            </Input>
            <Input
              id="VarianceName"
              type="text"
              placeholder="optional description"
              onChange={this._handleDescriptionChange}
              defaultValue={this.state.newItem.variationName}
            />
            <Button onClick={this._createNewProductVariation}>Create</Button>
          </InputGroup>
        </Col>
      </Row>
    );
  }

  _renderMeasureUnitLookupDefaultOption() {
    if (this.state.newItem.measureUnitId === 0)
      return (
        <option key="measureUnitId0" selected disabled hidden>
          e.g. gram
        </option>
      );
  }
  _renderMeasureUnitLookupOptions() {
    return this.state.measureLookupData.map((item, key) => (
      <option key={item.measureUnitId} value={item.measureUnitId.toString()}>
        {item.measureUnitDisplay}
      </option>
    ));
  }

  _handleMeasureChange = e => {
    this.setState({
      newItem: { ...this.state.newItem, measure: Number(e.target.value) }
    });
  };
  _handleMeasureUnitChange = e => {
    this.setState({
      newItem: { ...this.state.newItem, measureUnitId: Number(e.target.value) }
    });
  };
  _handleDescriptionChange = e => {
    this.setState({
      newItem: { ...this.state.newItem, variationName: e.target.value }
    });
  };

  _createNewProductVariation = () => {
    var ni = this.state.newItem;
    api.InsertProductVariationAndReturnListItem(ni).then(r => {
      const newList = this.state.items;
      newList.push(r.data);
      this.setState(s => ({
        items: newList,
        newItem: api.emptyProductVariation(this.props.productId)
      }));
    });
  };
}
