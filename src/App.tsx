import { useState, useMemo } from 'react';
import Layout from './components/Layout';
import BudgetItems from './components/BudgetItems';
import Income from './components/Income';
import MonthlySummary from './components/MonthlySummary';
import { BudgetItem, IncomeItem } from './types/models';
import { dummyBudgetItems, dummyIncomeItems } from './dummyData';

function App() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(dummyBudgetItems);
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>(dummyIncomeItems);

  const allocatedBudgetItems = useMemo(() => {
    // Sort income items by date
    const sortedIncome = [...incomeItems].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Sort budget items by due date
    const sortedBudget = [...budgetItems].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    let totalIncome = 0;
    let totalExpenses = 0;

    return sortedBudget.map(item => {
      // Calculate total income up to this budget item's due date
      while (sortedIncome.length > 0 && new Date(sortedIncome[0].date) <= new Date(item.dueDate)) {
        totalIncome += sortedIncome.shift()!.amount;
      }

      // Calculate cashflow
      const cashflow = totalIncome - totalExpenses - item.amount;

      // Update total expenses
      totalExpenses += item.amount;

      return {
        ...item,
        cashflow: cashflow,
      };
    });
  }, [budgetItems, incomeItems]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Personal Budget Tracker</h1>
        <div className="space-y-8">
          <Income items={incomeItems} setItems={setIncomeItems} />
          <BudgetItems items={allocatedBudgetItems} setItems={setBudgetItems} />
          <MonthlySummary budgetItems={allocatedBudgetItems} incomeItems={incomeItems} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
