"use client";

import { database } from "@/utils/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Button() {
  async function createRecord() {
    await setDoc(doc(database, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
  }

  return <button className="bg-sky-600 px-6 py-2 rounded-md text-white font-bold" onClick={createRecord}>Create Record</button>
}
