import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Spinner, FormGroup } from 'reactstrap';
import * as api from '../../api/productApi';
import { brand } from '../../api/viewModel/brand';
import * as brandApi from '../../api/brandApi';
import { product } from '../../api/viewModel/product';
import useForm from 'react-hook-form';
import { async } from 'q';

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

export default function ProductEditForm(props: _props) {
  const _initialState: _state = {
    isLoading: props.productId !== 0,
    isSuccess: false,
    productId: props.productId,
    product: api.emptyProduct(),
    brands: []
  };

  const [state, setState] = useState(_initialState);

  function updateState(vals) {
    setState(prevState => {
      return { ...prevState, ...vals };
    });
  }

  const { register, handleSubmit, errors } = useForm();

  //componentDidMount logic
  useEffect(() => {
    const fetchData = async () => {
      brandApi.GetLookup().then(r => {
        updateState({ brands: r.data });
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (state.productId !== 0)
        api.GetProduct(state.productId).then(r => {
          updateState({ isLoading: false, product: r.data });
        });
      else updateState({ isLoading: false });
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h1>Product Detail</h1>
      <hr className="mt-0" />

      {state.isLoading ? renderSpinner() : _renderForm()}
    </React.Fragment>
  );

  function _handleUserInputChange(e) {
    updateState({
      product: { ...state.product, [e.target.name]: e.target.value }
    });
  }
  function _handleBrandChange(e) {
    updateState({
      product: { ...state.product, brandId: Number(e.target.value) }
    });
  }

  function _save() {
    var p = state.product;
    var id = p.productId;

    if (id === 0) {
      api.InsertProduct(p).then(r => {
        id = r.data;
        updateState({
          productId: id,
          product: { ...state.product, productId: id }
        });
        props.OnProductSaved(id);
        console.log('Product inserted');
      });
    } else {
      api
        .UpdateProduct(p)
        .then(r => {
          props.OnProductSaved(id);
          console.log('Product updated');
        })
        .catch(function(error) {
          console.log('Error', error.message);
        });
    }
  }

  function renderSpinner() {
    return (
      <div>
        <Spinner color="primary" size="sm" />
        Loading...
      </div>
    );
  }

  function _renderForm() {
    return (
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormGroup>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Product name"
            defaultValue={state.product.name}
            onChange={_handleUserInputChange}
            ref={register({ required: true })}
          />
          <div id="nameError" className="invalid-input">
            {errors.name && 'Product Name is required'}
          </div>
        </FormGroup>

        <FormGroup>
          {_renderBrandLookup()}
          <div id="brandIdError" className="invalid-input">
            {errors.brandId && 'Brand Name is required'}
          </div>
        </FormGroup>
        <button id="btnSubmit" className="btn" type="submit">
          {_renderUpdateButtonText()}
        </button>
      </form>
    );
  }

  function _renderUpdateButtonText() {
    return state.productId === 0 ? 'Create' : 'Update';
  }

  function _renderBrandLookup() {
    return (
      <select
        className="form-control"
        name="brandId"
        id="brandId"
        onChange={_handleBrandChange}
        defaultValue={state.product.brandId.toString()}
        ref={register({ required: true })}
      >
        {_renderhiddenOption()}
        {_renderLookupOptions()}
      </select>
    );
  }
  function _renderhiddenOption() {
    if (state.product.brandId === 0)
      return (
        <option key="0" value="" selected disabled hidden>
          Brand Name
        </option>
      );
  }

  function _renderLookupOptions() {
    return state.brands.map((item, key) => (
      <option key={item.brandId} value={item.brandId.toString()}>
        {item.brandName}
      </option>
    ));
  }

  function formSubmit(e) {
    _save();
  }
}
