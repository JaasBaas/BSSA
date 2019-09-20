export interface Product {
  productId: number | null;
  name: string;
  brandId: number | null;
}

export const emptyProduct = (): Product => ({
  productId: 0,
  brandId: 0,
  name: ""
});
