import { Database } from "@/types/supabase";

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
};

export type Value = {
  id: number;
  value: string;
  description?: string;
};

export type IQuotation = {
  id: string;
  details?: IDetails | null;
  items?: Item[] | null;
  date: string;
  notes?: any;
  amount: number;
  number: string;
  status: Status;
  customer_id: string | null;
  customer: Customer | null;
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
  id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  mobile?: string | null;
  company?: string | null;
  email?: string | null;
  user_id?: string | null;
  created_at?: string | null;
  billing_address?: string | null;
}
