//#region imports
import * as api from './api';
import { brand } from './viewModel/brand';
//#endregion

export async function GetLookup() {
  return await api.bsApi.get<brand[]>(`/api/Brand/Lookup`);
}
