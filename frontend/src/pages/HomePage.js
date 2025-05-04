import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import PetList from '../components/PetList';
import AddPetForm from '../components/AddPetForm';
import FilterBar from '../components/FilterBar';
import PersonalityQuiz from '../components/PersonalityQuiz';
import { getAllPets, getPetsByMood } from '../services/api';

const HomePage = ({ setIsModalOpen }) => {
  const [pets, setPets] = useState([]);
  const [prevPets, setPrevPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const checkMoodChanges = useCallback(() => {
    pets.forEach(currentPet => {
      const prevPet = prevPets.find(p => p._id === currentPet._id);
      if (prevPet && prevPet.mood !== currentPet.mood && currentPet.mood === 'Sad') {
        toast.warning(
          <div className="flex items-start">
            <div>
              <p className="font-semibold text-gray-800">{currentPet.name} is feeling sad!</p>
              <p className="text-gray-600">They've been waiting for a home too long.</p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'border-l-4 border-yellow-500'
          }
        );
      }
    });
  }, [pets, prevPets]);

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPets();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
      toast.error(
        <div className="flex items-start">
          <div>
            <p className="font-semibold text-gray-800">Failed to load pets</p>
            <p className="text-gray-600">Please refresh the page and try again</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          className: 'border-l-4 border-red-500'
        }
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
    const interval = setInterval(fetchPets, 600000);
    return () => clearInterval(interval);
  }, [fetchPets]);
  
  useEffect(() => {
    if (prevPets.length > 0 && pets.length > 0) {
      checkMoodChanges();
    }
    setPrevPets(pets);
  }, [pets, prevPets, checkMoodChanges]);

  const handleFilter = useCallback(async (mood) => {
    setFilter(mood);
    try {
      setLoading(true);
      if (mood === 'all') {
        await fetchPets();
        toast.info(
          <div className="flex items-start">
            <div>
              <p className="font-semibold text-gray-800">Showing all pets</p>
              <p className="text-gray-600">All available pets are displayed</p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            className: 'border-l-4 border-blue-500'
          }
        );
      } else {
        const data = await getPetsByMood(mood);
        setPets(data);
        toast.success(
          <div className="flex items-start">
            <div>
              <p className="font-semibold text-gray-800">Filter applied</p>
              <p className="text-gray-600">Showing {mood.toLowerCase()} pets</p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            className: 'border-l-4 border-green-500'
          }
        );
      }
    } catch (error) {
      console.error('Error filtering pets:', error);
      toast.error(
        <div className="flex items-start">
          <div>
            <p className="font-semibold text-gray-800">Filter error</p>
            <p className="text-gray-600">Failed to filter pets. Please try again.</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          className: 'border-l-4 border-red-500'
        }
      );
    } finally {
      setLoading(false);
    }
  }, [fetchPets]);

  const resetFilters = useCallback(async () => {
    setFilter('all');
    setQuizResults(null);
    try {
      setLoading(true);
      await fetchPets();
      toast.info(
        <div className="flex items-start">
          <div>
            <p className="font-semibold text-gray-800">Filters reset</p>
            <p className="text-gray-600">Showing all available pets</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          className: 'border-l-4 border-blue-500'
        }
      );
    } catch (error) {
      console.error('Error resetting filters:', error);
      toast.error(
        <div className="flex items-start">
          <div>
            <p className="font-semibold text-gray-800">Reset failed</p>
            <p className="text-gray-600">Failed to reset filters. Please try again.</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          className: 'border-l-4 border-red-500'
        }
      );
    } finally {
      setLoading(false);
    }
  }, [fetchPets]);

  const handlePetAdded = useCallback((newPet) => {
    setPets(prev => [...prev, newPet]);
    toast.success(
      <div className="flex items-start">
        <div>
          <p className="font-semibold text-gray-800">{newPet.name} has been added!</p>
          <p className="text-gray-600">Welcome to our adoption center!</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        className: 'border-l-4 border-green-500'
      }
    );
  }, []);

  const handlePetUpdated = useCallback((updatedPet) => {
    setPets(prev => prev.map(pet => pet._id === updatedPet._id ? updatedPet : pet));
    toast.info(
      <div className="flex items-start">
        <div>
          <p className="font-semibold text-gray-800">{updatedPet.name}'s profile updated</p>
          <p className="text-gray-600">Changes saved successfully</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        className: 'border-l-4 border-blue-500'
      }
    );
  }, []);

  const handlePetAdopted = useCallback((adoptedPet) => {
    setPets(prev => prev.map(pet => pet._id === adoptedPet._id ? adoptedPet : pet));
    toast.success(
      <div className="flex items-start">
        <div>
          <p className="font-semibold text-gray-800">Congratulations!</p>
          <p className="text-gray-600">You adopted {adoptedPet.name}! 🎉</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 8000,
        className: 'border-l-4 border-green-500'
      }
    );
  }, []);

  const handlePetDeleted = useCallback((deletedId) => {
    setPets(prev => {
      const deletedPet = prev.find(pet => pet._id === deletedId);
      toast.warning(
        <div className="flex items-start">
          <div>
            <p className="font-semibold text-gray-800">{deletedPet?.name || 'Pet'} removed</p>
            <p className="text-gray-600">This pet is no longer available</p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          className: 'border-l-4 border-yellow-500'
        }
      );
      return prev.filter(pet => pet._id !== deletedId);
    });
  }, []);

  const displayPets = quizResults || pets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Virtual Pet Adoption Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect furry companion and give them a forever home
          </p>
        </motion.div>
        
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <motion.button 
            onClick={() => setShowQuiz(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Take Personality Quiz
          </motion.button>
          
          {(filter !== 'all' || quizResults) && (
            <motion.button 
              onClick={resetFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg"
            >
              Reset Filters
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Personality Quiz
                  </h2>
                  <button 
                    onClick={() => setShowQuiz(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl transition-colors"
                  >
                    &times;
                  </button>
                </div>
                <PersonalityQuiz 
                  pets={pets} 
                  onComplete={(results) => {
                    setQuizResults(results);
                    setShowQuiz(false);
                    toast.info(
                      <div className="flex items-start">
                        <div>
                          <p className="font-semibold text-gray-800">Quiz completed!</p>
                          <p className="text-gray-600">Found {results.length} pets matching your personality</p>
                        </div>
                      </div>,
                      {
                        position: "top-right",
                        autoClose: 5000,
                        className: 'border-l-4 border-blue-500'
                      }
                    );
                  }} 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-xl sticky top-4 border border-gray-100"
            >
              <AddPetForm onPetAdded={handlePetAdded} />
              <FilterBar currentFilter={filter} onFilter={handleFilter} />
            </motion.div>
          </div>
          
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"
                />
              </div>
            ) : displayPets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No pets found
                </h3>
                <p className="text-gray-600 mb-4">
                  {quizResults 
                    ? "No pets match your personality quiz results" 
                    : filter !== 'all' 
                      ? `No pets are currently ${filter.toLowerCase()}` 
                      : "There are currently no pets available for adoption"}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <PetList 
                pets={displayPets} 
                onPetUpdated={handlePetUpdated} 
                onPetAdopted={handlePetAdopted} 
                onPetDeleted={handlePetDeleted} 
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;