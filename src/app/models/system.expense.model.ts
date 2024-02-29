export class SystemExpenseModel {

  Id: number;
  Name: string;
  Month: number;
  MonthCopy: number;
  DayMonthlyBookClose: number;
  Year: number;
  YearCopy: number;
  GenerateExpensesCopy: boolean;

  PropertyName: string = "";
  Messages: string = '';
  Notification: [] = [];
}
