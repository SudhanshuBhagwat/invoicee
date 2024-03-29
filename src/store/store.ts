import { IQuotation, QUOTATION_DATABASE, Value } from "../components/Form";
import { create } from "zustand";
import { produce } from "immer";
import { format } from "date-fns";
import { Item } from "@/components/table-form";
import { v4 } from "uuid";

export const INITIAL_STATE: IQuotation = {
  id: "",
  details: {
    ownerName: "",
    ownerCompany: "",
    ownerMobile: "",
    ownerEmail: "",
    clientName: "",
    clientCompany: "",
    clientMobile: "",
    clientEmail: "",
  },
  date: format(new Date(), "yyyy-MM-dd"),
  note: "",
  items: [],
  amount: 0,
  number: "0",
};

export interface Settings {
  showSum: boolean;
  showSumForCategory: boolean;
}

interface Store {
  quotation: IQuotation;
  settings: Settings;
  setId: (id: string) => void;
  setState: (quotation: IQuotation | string | null) => void;
  updateNote: (note: string) => void;
  updateField(id: string, value: string): void;
  updateNumber(number: string): void;
  updateDate(date: string): void;
  addItem: () => void;
  addCategory: (id: string) => void;
  removeCategory: (itemId: string, index: number) => void;
  updateItem: (id: string, key: keyof Item, value: string) => void;
  updateSetting: (key: string, value: boolean) => void;
}

const store = create<Store>((set, get) => ({
  quotation: INITIAL_STATE,
  settings: {
    showSum: true,
    showSumForCategory: false,
  },
  setId: (id: string) => {
    set({
      quotation: {
        ...get().quotation,
        id,
      },
    });
  },
  setState: (initialState: IQuotation | string | null) => {
    if (typeof initialState === "string") {
      set({
        quotation: {
          ...INITIAL_STATE,
          id: String(initialState),
        },
      });
    } else {
      const state = initialState ? initialState : INITIAL_STATE;
      set({
        quotation: {
          ...state,
        },
      });
    }
  },
  updateNote: (note: string) => {
    set(
      produce((state) => {
        state.quotation.note = note;
      })
    );
  },
  updateField: (id: string, value: string) => {
    set(
      produce((state) => {
        state.quotation.details[id] = value;
      })
    );
  },
  updateNumber: (number: string) =>
    set(
      produce((state) => {
        state.quotation.number = number;
      })
    ),
  updateDate: (date: string) =>
    set(
      produce((state) => {
        state.quotation.date = date;
      })
    ),
  addItem: () => {
    set(
      produce((state) => {
        state.quotation.items.push({
          id: v4(),
          name: "",
          category: [
            {
              id: v4(),
              value: "",
            },
          ],
          amount: [
            {
              id: v4(),
              value: "",
            },
          ],
        });
      })
    );
  },
  addCategory: (id: string) => {
    set(
      produce((state) => {
        const itemIndex = state.quotation.items.findIndex(
          (i: Item) => i.id === id
        );
        state.quotation.items[itemIndex].category.push({
          id: v4(),
          value: "",
        });
        state.quotation.items[itemIndex].amount.push({
          id: v4(),
          value: "",
        });
      })
    );
  },
  removeCategory: (itemId: string, index: number) => {
    set(
      produce((state) => {
        const itemIndex = state.quotation.items.findIndex(
          (i: Item) => i.id === itemId
        );
        if (state.quotation.items[itemIndex].category.length === 1) {
          state.quotation.items.splice(itemIndex, 1);
        } else {
          state.quotation.items[itemIndex].category.splice(index, 1);
          state.quotation.items[itemIndex].amount.splice(index, 1);
        }
      })
    );
  },
  updateItem: (id: string, key: keyof Item, value: string) => {
    set(
      produce((state) => {
        if (key === "name" || key === "description") {
          const itemIndex = state.quotation.items.findIndex(
            (i: Item) => i.id === id
          );
          state.quotation.items[itemIndex][key] = value;
        } else {
          const indices = id.split("$");
          const itemId = indices[0];
          const innerItemId = indices[1];
          const itemIndex = state.quotation.items.findIndex(
            (i: Item) => i.id === itemId
          );
          const innerItemIndex = state.quotation.items[itemIndex][
            key
          ].findIndex((i: Item) => i.id === innerItemId);
          state.quotation.items[itemIndex][key][innerItemIndex].value = value;
        }
      })
    );
  },
  updateSetting: (key: string, value: boolean) => {
    set(
      produce((state) => {
        state.settings[key] = value;
      })
    );
  },
}));

export default store;
