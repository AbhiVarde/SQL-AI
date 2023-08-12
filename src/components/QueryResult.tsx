import { motion } from "framer-motion";
import { MdContentCopy } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const QueryResult = ({ darkMode, displayedResult, copyToClipboard }: any) => {
  return (
    <motion.div
      className={`relative rounded-lg border ${
        darkMode ? "border-gray-800" : "border-gray-300"
      } ${darkMode ? "bg-gray-800 bg-gray-800/50" : "bg-gray-100"} px-5 py-8`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      {displayedResult || "Your SQL query result will be displayed here."}
      <motion.p
        className={`absolute text-sm bottom-2 right-8 ${
          darkMode ? "text-white/70" : ""
        }`}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        - SQL AI 🤖
      </motion.p>
      <motion.button
        className={`absolute top-3 right-3 h-4 w-4 fill-gray-600 ${
          darkMode ? "fill-white" : ""
        }`}
        onClick={copyToClipboard}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MdContentCopy />
      </motion.button>
    </motion.div>
  );
};

export default QueryResult;
