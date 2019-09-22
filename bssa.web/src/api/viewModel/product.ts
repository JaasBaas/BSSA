export interface Product {
  productId: number;
  name: string;
  brandId: number;
}

export const emptyProduct = (): Product => ({
  productId: 0,
  brandId: 0,
  name: ''
});
