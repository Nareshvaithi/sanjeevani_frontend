
import { motion } from 'framer-motion';

const ConfirmNewStudent = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <h2 className='w-1/2 my-auto mx-auto text-xl font-bold text-center p-5 bg-green-500 text-white rounded-lg shadow-lg animate-celebrate'>🎉 Username and Password Created Successfully! 🎉</h2>
    </motion.div>
  );
}
;

export default ConfirmNewStudent;