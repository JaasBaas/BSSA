//#region imports
// import axios from "axios";
import * as api from './api';
import { product } from './viewModel/product';
import { productIndex } from './viewModel/productIndex';
import { productVariationListItem } from './viewModel/productVariationListItem';
import { productVariation } from './viewModel/productVariation';
import { productTag } from './viewModel/productTag';
import { productTagListItem } from './viewModel/productTagListItem';
//#endregion

//#region Product API methods
export async function GetProductSearchResults(criteria: string) {
  return await api.bsApi.get<productIndex[]>(
    `/api/product/SearchResults/${criteria}`
  );
}

export async function GetProduct(productId: number) {
  return await api.bsApi.get<product>(`/api/product/${productId}`);
}

export async function InsertProduct(product: product) {
  return await api.bsApi.post<number>('/api/product/InsertProduct', product);
}

export async function UpdateProduct(product: product) {
  return await api.bsApi.post('/api/product/UpdateProduct', product);
}

export const emptyProduct = (): product => ({
  productId: 0,
  brandId: 0,
  name: ''
});
//#endregion

//#region Product Variance
export async function GetProductVariations(productId: number) {
  return await api.bsApi.get<productVariationListItem[]>(
    `/api/product/ProductVariations/${productId}`
  );
}

export const emptyProductVariation = (
  productId?: number
): productVariation => ({
  productVariationId: 0,
  productId: productId || 0,
  measure: 0,
  measureUnitId: 0,
  variationName: ''
});

export async function InsertProductVariation(entity: productVariation) {
  return await api.bsApi.post<number>(
    '/api/product/InsertProductVariation',
    entity
  );
}
export async function InsertProductVariationAndReturnListItem(
  entity: productVariation
) {
  return await api.bsApi.post<productVariationListItem>(
    '/api/product/InsertProductVariationAndReturnListItem',
    entity
  );
}

//#endregion

//#region Product Tags
export async function GetProductTags(productId: number) {
  return await api.bsApi.get<productTagListItem[]>(
    `/api/product/${productId}/ProductTags`
  );
}

export async function InsertProductTag(productTag: productTag) {
  return await api.bsApi.post<boolean>(
    '/api/product/InsertProductTag',
    productTag
  );
}

export const emptyProductTag = (): productTag => ({
  productId: 0,
  tagId: 0
});

export async function DeleteProductTag(productId: number, tagId: number) {
  return await api.bsApi.delete<boolean>(
    `/api/product/DeleteProductTagById/${productId}/${tagId}`
  );
}
//#endregion
