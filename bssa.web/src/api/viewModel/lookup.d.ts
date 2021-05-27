
export interface lookup {
  id: number;
  value: string;
}

export interface lookupDetail {
  id: number;
  value: string;
  children: lookup[];
}
