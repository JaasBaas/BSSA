//#region imports
import * as api from './api';
import { lookup } from './viewModel/lookup';
//#endregion

export async function GetRetailerLookup() {
  return await api.bsApi.get<lookup[]>(`/api/Retailer/Lookup`);
}
