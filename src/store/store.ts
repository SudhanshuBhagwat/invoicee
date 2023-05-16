import { IQuotation, QUOTATION_DATABASE, Value } from "../components/Form";
import { create } from "zustand";
import produce from "immer";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import { database } from "@/utils/firebase";
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
  services: [],
  categories: [],
  note: [],
  items: [],
  amount: 0,
};

interface Store {
  quotation: IQuotation;
  setId: (id: string) => void;
  setState: (quotation: IQuotation | string | null) => void;
  fetchInVoiceCount: () => void;
  updateField(id: string, value: string): void;
  updateDate(date: string): void;
  addItem: () => void;
  addCategory: (id: string) => void;
  updateItem: (id: string, key: keyof Item, value: string) => void;
}

const store = create<Store>((set, get) => ({
  quotation: INITIAL_STATE,
  setId: (id: string) => {
    set({
      quotation: {
        ...get().quotation,
        id: `${Number(id) + 1}`.padStart(5, "0"),
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
        quotation: state,
      });
    }
  },
  fetchInVoiceCount: async () => {
    const coll = collection(database, QUOTATION_DATABASE);
    const snapshot = await getCountFromServer(coll);
    const count = snapshot.data().count;

    const id =
      count === 0 ? `${1}`.padStart(5, "0") : `${count + 1}`.padStart(5, "0");
    set({
      quotation: {
        ...get().quotation,
        id,
      },
    });
  },
  updateField: (id: string, value: string) => {
    set(
      produce((state) => {
        state.quotation.details[id] = value;
      })
    );
  },
  updateDate: (date: string) =>
    set(
      produce((state) => {
        state.date = date;
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
  updateItem: (id: string, key: keyof Item, value: string) => {
    set(
      produce((state) => {
        if (key === "name") {
          const itemIndex = state.quotation.items.findIndex(
            (i: Item) => i.id === id
          );
          state.quotation.items[itemIndex].name = value;
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
}));

export default store;
