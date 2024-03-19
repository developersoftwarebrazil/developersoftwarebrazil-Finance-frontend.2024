export class CategoryModel{
  Id!: number;
  Name!: string;
  SystemExpenseId!: number;
  SystemIncomeId!: number;

  PropertyName: string = "";
  Messages: string = '';
  Notification: [] = [];
}
