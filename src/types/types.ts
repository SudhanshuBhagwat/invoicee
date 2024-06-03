export interface UserData {
  id: string;
  providerId: string;
  name: string;
  email: string;
  company: string;
  mobile: string;
}

export type IAmount = {
  value: number;
  description: string;
};

export type IDetails = {
  ownerName: string;
  ownerCompany: string;
  ownerMobile: string;
  ownerEmail: string;
  clientName: string;
  clientCompany: string;
  clientMobile: string;
  clientEmail: string;
};

export type Value = {
  id: number;
  value: string;
  description?: string;
};

export type IQuotation = {
  id: string;
  details: IDetails;
  items: Item[];
  date: string;
  notes: any;
  amount: number;
  number: string;
  status: Status;
};

export enum Status {
  "Draft",
  "Due",
  "Paid",
}

export interface SubItem {
  id: string;
  value: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: SubItem[];
  amount: SubItem[];
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  company: string;
  email: string;
  user_id: string;
  created_at: string;
}
