import { BudgetItem, IncomeItem } from './types/models';
import { v4 as uuidv4 } from 'uuid';

const currentYear = new Date().getFullYear();

export const dummyBudgetItems: BudgetItem[] = [
  {
    id: uuidv4(),
    name: 'Rent',
    amount: 1200,
    dueDate: `${currentYear}-10-01`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Utilities',
    amount: 150,
    dueDate: `${currentYear}-10-15`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Groceries',
    amount: 400,
    dueDate: `${currentYear}-10-05`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Car Payment',
    amount: 300,
    dueDate: `${currentYear}-10-10`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Internet',
    amount: 70,
    dueDate: `${currentYear}-10-20`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Phone Bill',
    amount: 80,
    dueDate: `${currentYear}-10-18`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Gym Membership',
    amount: 50,
    dueDate: `${currentYear}-10-05`,
    income: '',
    cashflow: 0,
    isRecurring: true,
  },
];

export const dummyIncomeItems: IncomeItem[] = [
  {
    id: uuidv4(),
    name: 'Salary',
    amount: 3000,
    date: `${currentYear}-10-01`,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Part-time Job',
    amount: 800,
    date: `${currentYear}-10-15`,
    isRecurring: true,
  },
  {
    id: uuidv4(),
    name: 'Freelance Project',
    amount: 500,
    date: `${currentYear}-10-20`,
    isRecurring: false,
  },
  {
    id: uuidv4(),
    name: 'Investment Dividend',
    amount: 100,
    date: `${currentYear}-10-05`,
    isRecurring: false,
  },
];

