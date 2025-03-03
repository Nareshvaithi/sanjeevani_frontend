import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ConfirmNewStudent = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowConfetti(true), 500); // Delay confetti for effect
  }, []);

  return (
   
    
        
    <div>🎉 Username and Password Created Successfully! 🎉</div>
     
  );
};

export default ConfirmNewStudent;
