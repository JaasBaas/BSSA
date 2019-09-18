//#region imports
// import axios from "axios";
import * as api from "./api";
import { Product, emptyProduct } from "./ViewModel/Product";
import { ProductIndex } from "./ViewModel/ProductIndex";
//#endregion

//#region Product API methods
export async function GetProductSearchResults(criteria: string) {
  return await api.bsApi.get<ProductIndex[]>(`/product/SearchResults/${criteria}`);
}

export function GetProduct(productId: number): Product {
  //let item = { productId: 1, name: "Weetbix", brandId: 3 };
  return emptyProduct();
}

export function UpdateProduct(product: Product): api.apiCreateUpdateResult {
  return { success: true, identity: 5, errorMsg: "" };
}
//#endregion

//#region Product Variance
export interface ProductVariance {
  ProductVarianceId: number;
  ProductId: number;
  Measure?: number;
  MeasureUnitId?: number;
  VarianceName: string;
}

export interface ProductVarianceIndex {
  ProductVarianceId: number;
  ProductId: number;
  VarianceName: string;
  MeasureUnit: string;
  Measure: number;
}

export function GetProductVariances(productId: number): ProductVarianceIndex[] {
  let items: ProductVarianceIndex[] = [
    { ProductId: 1, ProductVarianceId: 5, VarianceName: "24 Biscuits", MeasureUnit: "gram", Measure: 400 },
    { ProductId: 1, ProductVarianceId: 9, VarianceName: "48 Biscuits", MeasureUnit: "gram", Measure: 800 }
  ];

  return items;
}

export const emptyProductVariance = (): ProductVariance => ({
  ProductVarianceId: 0,
  ProductId: 0,
  Measure: 0,
  MeasureUnitId: 0,
  VarianceName: ""
});
//#endregion

//#region Product Tags
export interface ProductTag {
  ProductId: number;
  TagId?: number;
  TagName: string;
}

export function GetProductTags(productId: number): ProductTag[] {
  let items: ProductTag[] = [
    { ProductId: 1, TagId: 5, TagName: "24 Biscuits" },
    { ProductId: 1, TagId: 9, TagName: "48 Biscuits" }
  ];

  return items;
}

export function CreateProductTag(productTag: ProductTag): api.apiCreateUpdateResult {
  let result: api.apiCreateUpdateResult = { success: true, identity: 5, errorMsg: "" };

  return result;
}

export const emptyProductTag = (): ProductTag => ({
  ProductId: 0,
  TagId: 0,
  TagName: ""
});
//#endregion
