declare global {
  interface Number {
    toCurrency(): string;
  }
}

Number.prototype.toCurrency = function (): string {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  
  return formatter.format(this.valueOf()).replace(/\u00A0/, " ");
};

export { };