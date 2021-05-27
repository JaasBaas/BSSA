//#region imports
import * as api from './api';
import { lookup } from './viewModel/lookup';
import { storeIndex } from './viewModel/storeIndex';
//#endregion

export async function GetStoreLookup(retailerId: number, provinceId: number) {
  return await api.bsApi.get<lookup[]>(
    `/api/Store/Lookup/${retailerId}/${provinceId}`
  );
}

export async function GetSpecialStores(specialId: number) {
  return await api.bsApi.get<storeIndex[]>(
    `/api/Store/SpecialStores/${specialId}`
  );
}

export async function GetSpecialStoresLookupDetail(specialId: number) {
  return await api.bsApi.get<storeIndex[]>(
    `/api/Store/SpecialStoresLookupDetail/${specialId}`
  );
}

export async function SearchRetailerStores(retailers: Number[], searchCriteria: String) {
  let retailerCsv = retailers.join(',');
  let x = await api.bsApi.get<storeIndex[]>(
    `/api/Store/SearchRetailerStores/${retailerCsv}/${searchCriteria}`
  );

  return x;
}

export async function InsertSpecialStore(specialId: number, storeId: number) {
  return await api.bsApi.post(
    `/api/Store/InsertSpecialStore/${specialId}/${storeId}`
  );
}

export async function DeleteSpecialStore(specialId: number, storeId: number) {
  return await api.bsApi.delete(
    `/api/Store/DeleteSpecialStore/${specialId}/${storeId}`
  );
}
