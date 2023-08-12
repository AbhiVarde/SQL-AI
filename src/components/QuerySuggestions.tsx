import { motion } from "framer-motion";

const QuerySuggestions = ({
  suggestions,
  darkMode,
  setSelectedSuggestion,
}: any) => {
  return (
    <motion.div
      className="overflow-x-scroll no-scrollbar flex flex-nowrap mb-6"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {suggestions.map((suggestion: any, index: any) => (
        <motion.button
          key={index}
          className={`mt-4 mr-2 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold text-gray-900 ${
            darkMode
              ? " bg-black/30 border-none text-white border-gray-100"
              : "bg-gray-200"
          }`}
          onClick={() => {
            setSelectedSuggestion(suggestion);
          }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuerySuggestions;
