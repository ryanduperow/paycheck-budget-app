import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dialog from './Dialog';
import { IncomeItem } from '../types/models';

interface IncomeProps {
  items: IncomeItem[];
  setItems: React.Dispatch<React.SetStateAction<IncomeItem[]>>;
}

function Income({ items, setItems }: IncomeProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Omit<IncomeItem, 'id'>>({
    name: '',
    amount: 0,
    date: '',
    isRecurring: false,
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.amount > 0 && newItem.date) {
      setItems([...items, { ...newItem, id: uuidv4() }]);
      setNewItem({
        name: '',
        amount: 0,
        date: '',
        isRecurring: false,
      });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-500">
        <h2 className="text-2xl font-semibold text-white">Income</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
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
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          + Add Income
        </button>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Add Income">
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
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
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
          <button onClick={handleAddItem} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Income
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default Income;
