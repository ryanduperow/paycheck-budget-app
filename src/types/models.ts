export interface BudgetItem {
   id: string;
   name: string;
   amount: number;
   dueDate: string;
   income: string;
   cashflow: number;
   isRecurring: boolean;
 }
 
 export interface IncomeItem {
   id: string;
   name: string;
   amount: number;
   date: string;
   isRecurring: boolean;
 }