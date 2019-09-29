//#region imports
import * as api from './api';
import { measureUnitLookup } from './viewModel/measureUnitLookup';
//#endregion

export async function GetLookup() {
  return await api.bsApi.get<measureUnitLookup[]>(`/api/MeasureUnit/Lookup`);
}
