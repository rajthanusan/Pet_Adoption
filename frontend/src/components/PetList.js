import { motion } from 'framer-motion';
import PetCard from './PetCard';

const PetList = ({ pets, onPetUpdated, onPetAdopted, onPetDeleted, setIsModalOpen }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pets.map((pet) => (
        <motion.div
          key={pet._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PetCard
            pet={pet}
            onPetUpdated={onPetUpdated}
            onPetAdopted={onPetAdopted}
            onPetDeleted={onPetDeleted}
            setIsModalOpen={setIsModalOpen}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PetList;