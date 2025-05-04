import { useState } from 'react';
import HomePage from './pages/HomePage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
            <div className={`min-h-screen bg-gray-100 transition-all duration-300 ${isModalOpen ? 'blur-sm' : ''}`}>
        <HomePage setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}

export default App;