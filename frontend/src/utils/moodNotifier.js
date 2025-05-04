import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const checkMoodChanges = (prevPets, currentPets) => {
  currentPets.forEach(currentPet => {
    const prevPet = prevPets.find(p => p._id === currentPet._id);
    if (prevPet && prevPet.mood !== currentPet.mood && currentPet.mood === 'Sad') {
      toast.warning(`${currentPet.name} is feeling sad! They've been waiting for a home too long.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  });
};