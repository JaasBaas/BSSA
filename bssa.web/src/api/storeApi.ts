//#region imports
import * as api from './api';
import { lookup } from './viewModel/lookup';
//#endregion

export async function GetStoreLookup(retailerId: number, provinceId: number) {
  return await api.bsApi.get<lookup[]>(
    `/api/Store/Lookup/${retailerId}/${provinceId}`
  );
}
