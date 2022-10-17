export type InvoicePaymentMethodsPayments = {
  id: string;
  receivedDate: number;
  value: string;
  fee: string;
  status: "Invalid" | "Processing" | "Settled";
  destination: string;
};

export type InvoicePaymentMethods = {
  activated: boolean;
  destination: string;
  paymentLink: string;
  rate: string;
  paymentMethodPaid: string;
  totalPaid: string;
  due: string;
  amount: string;
  networkFee: string;
  payments: InvoicePaymentMethodsPayments[];
  paymentMethod: "BTC";
  cryptoCode: "BTC";
};
