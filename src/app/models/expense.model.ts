export class ExpenseModel {
  PropertyName: string = "";
  Messages: string = '';
  Notification: [] = [];

  Id: number;
  Name: string;
  Month: number;
  Year: number;
  Value: number;
  RegistrationDat!: Date;
  RegistrationChangeDate: Date;
  PaymentDate: Date;
  DueDate: Date;
  PayedOut: boolean;
  OverdueExpense: Date;
  TransactionTypes: number;
  CategoryExpenseId: number;
}
