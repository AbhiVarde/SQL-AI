import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";

const DarkModeToggle = ({ darkMode, toggleDarkMode }: any) => {
  return (
    <motion.button
      className={`fixed top-5 right-3 z-10 h-7 w-7 rounded-full bg-gray-200/70 fill-black/50 p-1.5 ${
        darkMode ? "bg-gray-800/30 fill-white/80" : ""
      }`}
      aria-label="Switch Theme"
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? (
        <motion.span whileHover={{ y: -2 }}>
          <FiSun className="h-4 w-4 text-white" />
        </motion.span>
      ) : (
        <motion.span whileHover={{ y: -2 }}>
          <FiMoon className="h-4 w-4 text-black" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
