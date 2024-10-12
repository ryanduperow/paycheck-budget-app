import { BudgetItem, IncomeItem } from '../types/models';

interface MonthlySummaryProps {
  budgetItems: BudgetItem[];
  incomeItems: IncomeItem[];
}

function MonthlySummary({ budgetItems, incomeItems }: MonthlySummaryProps) {
  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-purple-500">
        <h2 className="text-2xl font-semibold text-white">Monthly Summary</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Income:</span>
          <span className="text-lg font-bold text-green-600">${totalIncome.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Expenses:</span>
          <span className="text-lg font-bold text-red-600">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-xl font-medium">Balance:</span>
          <span className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummary;
