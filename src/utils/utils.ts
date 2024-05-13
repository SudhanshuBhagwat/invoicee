import { IQuotation } from "@/components/Form";

export function calculateTotalAmount(quotation: IQuotation) {
  return quotation.items.length > 0
    ? quotation.items
        .map((item) => {
          return item.amount.reduce(
            (acc, subItem) => acc + Number(subItem.value),
            0
          );
        })
        .reduce((acc, item) => {
          return acc + item;
        }, 0)
    : 0;
}
