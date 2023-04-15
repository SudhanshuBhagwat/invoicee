"use client";

import QuotationForm from "@/components/QuotationForm";
import Preview from "@/components/Preview";

import store from "@/store/store";

export default function Main() {
  const fetchInVoiceCount = store(state => state.fetchInVoiceCount);
  fetchInVoiceCount();

  return <section className="grid grid-cols-2 gap-4 divide-x-2">
    <QuotationForm />
    <Preview />
  </section>
}
