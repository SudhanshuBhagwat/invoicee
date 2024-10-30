import AppIcon from "@/components/icons/app";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full flex items-center justify-between gap-4 bg-background px-6 md:px-10 py-6">
        <nav className="gap-3 text-lg font-medium flex flex-row items-center sm:gap-5 sm:text-sm lg:gap-6">
          <h1 className="flex items-center gap-2 text-lg font-semibold md:text-base select-none">
            <AppIcon />
            Invoicee
          </h1>
        </nav>
        <div className="w-full flex items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground bg-emerald-400 text-black px-4 py-2 rounded-full"
          >
            Contact Us
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center mt-48 select-none">
        <h1 className="text-8xl font-medium text-center leading-[5rem]">
          Make beautiful{" "}
          <span className="font-bold before:bg-emerald-400/60 before:content-['Invoices'] before:px-4 before:-rotate-2 before:inline-block before:py-2"></span>{" "}
          <br /> with ease
        </h1>
        <p className="text-lg text-center mt-8 text-gray-600">
          We will help you create invoices in a matter of clicks and do all the
          book-keeping for you. <br />
          Easily store the Invoices on the cloud or have them stored as PDF's
        </p>
        <Link
          href={"/signin"}
          className="items-center flex gap-2 font-semibold text-muted-foreground transition-colors hover:text-foreground bg-emerald-400 text-black px-8 py-4 rounded-full mt-8"
        >
          Get Started <ArrowRight className="text-black inline" />
        </Link>
      </main>
    </div>
  );
}
