import { motion } from "framer-motion";

const QueryForm = ({
  darkMode,
  selectedSuggestion,
  setSelectedSuggestion,
  handleSubmit,
}: any) => {
  return (
    <motion.form
      className="flex flex-col justify-center my-6"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <textarea
        placeholder="Enter your SQL query..."
        className={`relative px-4 py-2 rounded-lg border ${
          darkMode ? "border-gray-800" : "border-gray-300"
        } ${darkMode ? "bg-gray-800 bg-gray-800/50" : "bg-gray-100"}`}
        name="sqlQuery"
        rows={2}
        required
        value={selectedSuggestion || ""}
        onChange={(event) => setSelectedSuggestion(event.target.value)}
      ></textarea>
      <motion.button
        className={`mt-4 flex h-10 items-center justify-center rounded-md px-4 text-lg font-semibold text-white ${
          darkMode ? "bg-black bg-black/50" : "bg-black"
        }`}
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Ask SQL AI ✨
      </motion.button>
    </motion.form>
  );
};

export default QueryForm;
