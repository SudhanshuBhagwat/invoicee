"use client";

import { database } from "@/utils/firebase";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Button() {
  const [id, setId] = useState<number>(1);

  async function createRecord() {
    const document = "Q-" + `${id}`.padStart(5, "0");
    console.log(document);
    await setDoc(doc(database, "quotation", document), {
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
      amount: 0,
    });
    setId(id => id + 1);
  }

  return <button className="bg-sky-600 px-6 py-2 rounded-md text-white font-bold" onClick={createRecord}>Create Record {id}</button>
}
