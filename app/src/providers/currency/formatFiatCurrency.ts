const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatFiatCurrency = (amount: number | string) => formatter.format(Number(amount));

export default formatFiatCurrency;
