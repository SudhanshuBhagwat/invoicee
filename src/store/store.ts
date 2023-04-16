import { IItem, IQuotation, QUOTATION_DATABASE, Value } from "../components/QuotationForm"
import { create } from "zustand"
import produce from 'immer'
import { OptionWithValue } from "@/components/ComboBox"
import { collection, getCountFromServer } from "firebase/firestore"
import { database } from "@/utils/firebase"
import { format } from "date-fns"

const INITIAL_STATE: IQuotation = {
  id: "",
  details: {
    ownerName: "",
    ownerCompany: "",
    ownerMobile: "",
    ownerEmail: "",
    clientName: "",
    clientCompany: "",
    clientMobile: "",
    clientEmail: ""
  },
  date: format(new Date(), "yyyy-MM-dd"),
  services: [],
  categories: [],
  note: [],
  items: [],
}

interface Store {
  quotation: IQuotation,
  fetchInVoiceCount: () => void,
  updateDetails(id: string, value: string): void,
  addItem(item: IItem): void,
  updateDate(date: string): void,
  addService(service: Value): void,
  removeService(service: Value): void,
  addCategory(category: Value): void,
  removeCategory(category: Value): void,
  addItem(item: IItem): void
  removeItem(item: IItem): void
  updateItem(item: IItem, id: string): void;
  clearItems(): void;
}

const store = create<Store>((set, get) => ({
  quotation: INITIAL_STATE,
  fetchInVoiceCount: async () => {
    const coll = collection(database, QUOTATION_DATABASE);
    const snapshot = await getCountFromServer(coll);
    const count = snapshot.data().count;

    const id = count === 0 ? "Q-" + `${1}`.padStart(5, "0") : "Q-" + `${count + 1}`.padStart(5, "0");
    set({
      quotation: {
        ...get().quotation,
        id
      }
    })
  },
  updateDetails: (id: string, value: string) => (
    set(
      produce((state) => {
        state.quotation.details[id] = value;
      })
    )
  ),
  updateDate: (date: string) => (
    set(
      produce((state) => {
        state.date = date;
      })
    )
  ),
  addService: (service: Value) => {
    const found = get().quotation.services.find((s: Value) => s.value === service.value);
    const quotation = get().quotation;
    let services = get().quotation.services;
    if (!found) {
      services = [...services, service];
      set({
        quotation: {
          ...quotation,
          services
        }
      })
    }
  },
  removeService: (service: Value) => (
    set(
      produce((state) => {
        const newServices = Array.from(state.quotation.services as OptionWithValue<Value>[]).filter(
          (option) => option.value !== service.value
        );
        state.quotation.services = newServices
      })
    )
  ),
  clearServices: () => (
    set(
      produce((state) => {
        state.quotation.services = []
      })
    )
  ),
  addCategory: (category: Value) => {
    const found = get().quotation.categories.find((s: Value) => s.value === category.value);
    const quotation = get().quotation;
    let categories = get().quotation.categories;
    if (!found) {
      categories = [...categories, category];
      set({
        quotation: {
          ...quotation,
          categories
        }
      })
    }
  },
  removeCategory: (category: Value) => (
    set(
      produce((state) => {
        const newCategories = Array.from(state.quotation.categories as OptionWithValue<Value>[]).filter(
          (option) => option.value !== category.value
        );
        state.quotation.services = newCategories
      })
    )
  ),
  clearCategories: () => (
    set(
      produce((state) => {
        state.quotation.clearCategories = []
      })
    )
  ),
  addItem: (item: IItem) => (
    set(
      produce((state) => {
        state.quotation.items = [
          ...state.quotation.items,
          item
        ]
      })
    )
  ),
  removeItem: (item: IItem) => {
    const newItems = get().quotation.items.filter(i => i.id !== item.id)
    set({
      quotation: {
        ...get().quotation,
        items: newItems
      }
    })
  },
  updateItem: (item: IItem, id: string) => {
    const newItems = get().quotation.items.filter(i => i.id !== id)
    set({
      quotation: {
        ...get().quotation,
        items: [
          ...newItems,
          item
        ]
      }
    })
  },
  clearItems: () => {
    set({
      quotation: {
        ...get().quotation,
        items: []
      }
    })
  }
}));

export default store;
