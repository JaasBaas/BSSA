import api from "../axios/api";

interface productIndexView {
  productId: number;
  productName: string;
  brandName: string;
  productVariationCount: number;
}

class productIndexState {
  constructor(name) {
    this.brand = name;
  }
}

export async function getProductIndexSearchResults(criteria) {
  try {
    const response = await api.get("api/Product/Index");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
