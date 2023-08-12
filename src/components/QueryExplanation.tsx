import { motion } from "framer-motion";

const QueryExplanation = ({ explanation, darkMode }: any) => {
  return (
    <motion.div
      className={`rounded-lg border ${
        darkMode ? "border-gray-800" : "border-gray-300"
      } mt-4 p-4 ${darkMode ? "bg-gray-800 bg-gray-800/50" : "bg-gray-100"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-lg font-semibold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Explanation:
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {explanation || "No explanation available."}
      </motion.p>
    </motion.div>
  );
};

export default QueryExplanation;
