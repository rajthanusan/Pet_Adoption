import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaTrash, FaEdit, FaHome, FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { adoptPet, deletePet } from "../services/api";
import EditPetForm from "./EditPetForm";
import AdoptionCertificate from "./AdoptionCertificate";

const speciesEmojis = {
  Dog: "🐶",
  Cat: "🐱",
  Rabbit: "🐰",
  Bird: "🦜",
  Fish: "🐠",
  Other: "🐾",
};

const moodData = {
  Happy: { color: "bg-green-100 text-green-800", emoji: "😊" },
  Excited: { color: "bg-yellow-100 text-yellow-800", emoji: "😃" },
  Sad: { color: "bg-red-100 text-red-800", emoji: "😢" },
};

const PetCard = ({ pet, onPetUpdated, onPetAdopted, onPetDeleted }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("backdrop-blur-sm");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("backdrop-blur-sm");
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("backdrop-blur-sm");
    };
  }, [isModalOpen]);

  const handleAdopt = async () => {
    try {
      setIsAdopting(true);
      const adoptedPet = await adoptPet(pet._id);
      onPetAdopted(adoptedPet);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error("Error adopting pet:", error);
      toast.error(
        <div className="p-2">
          <p className="font-bold text-lg text-red-800">Adoption failed</p>
          <p className="text-gray-700">Please try again later</p>
        </div>,
        {
          position: "top-right",
          className: "border-l-4 border-red-500",
        }
      );
    } finally {
      setIsAdopting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePet(pet._id);
      onPetDeleted(pet._id);
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error(
        <div className="p-2">
          <p className="font-bold text-lg text-red-800">Deletion failed</p>
          <p className="text-gray-700">Couldn't remove the pet</p>
        </div>,
        {
          position: "top-right",
          className: "border-l-4 border-red-500",
        }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSuccess = (updatedPet) => {
    onPetUpdated(updatedPet);
    setIsModalOpen(false);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all ${
            isModalOpen ? "opacity-70" : ""
          }`}
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">
                  {speciesEmojis[pet.species] || speciesEmojis.Other}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{pet.name}</h3>
                  <p className="text-indigo-100">
                    {pet.species} • {pet.age} years old
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  moodData[pet.mood].color
                } flex items-center gap-1`}
              >
                {moodData[pet.mood].emoji} {pet.mood}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Personality
              </h4>
              <p className="text-gray-700">{pet.personality}</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div>
                {pet.adopted ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <FaHeart className="mr-2" /> Adopted
                  </span>
                ) : (
                  <motion.button
                    onClick={handleAdopt}
                    disabled={isAdopting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all disabled:opacity-50"
                  >
                    {isAdopting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adopting...
                      </>
                    ) : (
                      <>
                        <FaHome className="mr-2" /> Adopt Me
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              <div className="flex space-x-3">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:text-indigo-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
                  title="Edit"
                >
                  <FaEdit />
                </motion.button>

                <motion.button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50"
                  title="Delete"
                >
                  {isDeleting ? (
                    <svg
                      className="animate-spin h-4 w-4 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <FaTrash />
                  )}
                </motion.button>
              </div>
            </div>

            {pet.adopted && (
              <div className="mt-6">
                <AdoptionCertificate pet={pet} />
              </div>
            )}
          </div>
        </motion.div>

        {pet.adopted && (
          <div className="absolute -top-3 -right-3 z-10">
            <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
              <FaPaw className="h-5 w-5" />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <EditPetForm
              pet={pet}
              onClose={() => setIsModalOpen(false)}
              onPetUpdated={handleEditSuccess}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PetCard;
