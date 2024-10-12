import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dialog from './Dialog';
import { BudgetItem } from '../types/models';

interface BudgetItemsProps {
  items: BudgetItem[];
  setItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
}

function BudgetItems({ items, setItems }: BudgetItemsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<BudgetItem, 'id' | 'income' | 'cashflow'>>({
    name: '',
    amount: 0,
    dueDate: '',
    isRecurring: false,
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.amount > 0 && newItem.dueDate) {
      setItems([...items, {
        ...newItem,
        id: uuidv4(),
        income: '',
        cashflow: 0
      }]);
      setNewItem({
        name: '',
        amount: 0,
        dueDate: '',
        isRecurring: false,
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getItemColor = (item: BudgetItem) => {
    if (item.cashflow < 0) return 'bg-red-100';
    if (item.cashflow < item.amount) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-green-500">
        <h2 className="text-2xl font-semibold text-white">Budget Items</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cashflow</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className={getItemColor(item)}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={item.cashflow < 0 ? 'text-red-600 font-bold' : ''}>
                      ${item.cashflow.toFixed(2)}
                    </span>
                    {item.cashflow < 0 && (
                      <span className="ml-2 text-red-600">⚠️ Warning: Negative Cashflow</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.isRecurring ? '🔁' : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button 
          onClick={() => setIsDialogOpen(true)} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          + Add Budget Item
        </button>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Add Budget Item">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newItem.amount || ''}
            onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
            className="w-full border rounded px-2 py-1"
          />
          <input
            type="date"
            value={newItem.dueDate}
            onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={newItem.isRecurring}
              onChange={(e) => setNewItem({ ...newItem, isRecurring: e.target.checked })}
              className="mr-2"
            />
            <span>Recurring</span>
          </div>
          <button onClick={handleAddItem} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Budget Item
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default BudgetItems;
