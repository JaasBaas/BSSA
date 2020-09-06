//#region imports
import * as api from './api';
import { lookup } from './viewModel/lookup';
//#endregion

export async function GetProvinceLookup() {
  return await api.bsApi.get<lookup[]>(`/api/Geographic/ProvinceLookup`);
}

export async function GetTownLookup(provinceId: number) {
  return await api.bsApi.get<lookup[]>(
    `/api/Geographic/TownLookup/${provinceId}`
  );
}
