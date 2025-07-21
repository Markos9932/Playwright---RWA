export interface TransactionTestData {
  transactionPartner: string;
  transactionPartner1: string;
  transactionPartnerHeader: string;
  transactionPartnerHeader1: string;
  negativeAmount: string;
  amount: string;
  amount1: string;
  amount2: string;
  value: string;
  value1: string;
  note: string;
  paidText: string;
  forText: string;
  noTransText: string;
  valueAmount: string;
}

const transactionTestData: TransactionTestData = {
  transactionPartner: "Ted",
  transactionPartner1: "Bradtke",
  transactionPartnerHeader: "Ted Parisian",
  transactionPartnerHeader1: "Kristian Bradtke",
  negativeAmount: "-",
  amount: "800",
  amount1: "700",
  amount2: "560",
  value: "$800",
  value1: "$700",
  note: "Payment",
  paidText: "Paid $800.00 for Payment",
  forText: "for",
  noTransText: "No Transactions",
  valueAmount: "$800.00"
};

export default transactionTestData;
