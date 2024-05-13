import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { quotation, userId } = await request.json();
  const requestData = {
    ...quotation,
    client_company: quotation.details.clientCompany,
    client_email: quotation.details.clientEmail,
    client_mobile: quotation.details.clientMobile,
    client_name: quotation.details.clientName,
    quote_number: Number(quotation.number),
    items: [],
    created_by_id: userId,
  };

  delete requestData["details"];

  const res = await prisma.invoices.create({
    data: requestData,
  });
  console.log(res);

  return Response.json({
    res,
  });
}
