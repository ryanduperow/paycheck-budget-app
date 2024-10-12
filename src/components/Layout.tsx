import { useState, ReactNode } from 'react';
import { format, addMonths, subMonths } from 'date-fns';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Paycheck to Budget Item Allocation
          </h1>
          <div className="flex items-center">
            <span className="text-lg font-semibold mr-4">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button onClick={handlePreviousMonth} className="text-2xl">◀</button>
            <button onClick={handleNextMonth} className="text-2xl ml-2">▶</button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;

