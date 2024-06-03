import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { getCustomers } from "@/services/customers";
import { Status } from "@/types/types";
import { format, formatISO } from "date-fns";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const customers = await getCustomers();

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <div className="text-3xl font-bold tracking-tight">Customers</div>
          <div className="text-sm text-muted-foreground">
            Manage your customers and view more insights about them.
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <Link
            href="/new-customer"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Customer
          </Link>
        </div>
      </div>
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Invoices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Amount Due</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium flex flex-col items-start">
                    {customer.name}
                    <span className="font-normal text-sm">
                      {customer.company}
                    </span>
                  </TableCell>
                  <TableCell>123</TableCell>
                  <TableCell>
                    <Badge variant="outline">Due</Badge>
                  </TableCell>
                  <TableCell>123,23₹</TableCell>
                  <TableCell className="hidden md:table-cell">100,0₹</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            className="w-full"
                            href={`/customer/${customer.id}`}
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button className="w-full text-left">Delete</button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-12 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
