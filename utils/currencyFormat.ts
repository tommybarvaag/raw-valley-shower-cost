// Currently a bug in V8 regarding nb-NO and Intl.NumberFormat
// https://bugs.chromium.org/p/v8/issues/detail?id=11897
// using sv-SE as a workaround for now
const currencyFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "NOK",
  currencyDisplay: "code",
  minimumFractionDigits: 2,
});

export const formatCurrency = (number: number): string => currencyFormatter.format(number);
