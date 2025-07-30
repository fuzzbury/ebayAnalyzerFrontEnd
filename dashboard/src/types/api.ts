export interface InventoryItem {
  [key: string]: any;
}

export interface LegoSet {
  [key: string]: any;
}

export interface Stats {
  [key: string]: any;
}

export interface Image {
  [key: string]: any;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface GetInventoryParams {
  skip?: number;
  limit?: number;
  is_lego?: boolean | null;
}

export interface GetLegoSetsParams {
  skip?: number;
  limit?: number;
}