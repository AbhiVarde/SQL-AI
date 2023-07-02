import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { AiTwotoneHeart } from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [queryResult, setQueryResult] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const suggestions = [
    "Min Salary",
    "Salary for a specific range",
    "Join Two Tables",
    "Total number of employees",
    "Highest Salary",
  ];

  useEffect(() => {
    // Typing effect
    const typeText = () => {
      let i = 0;
      const typingInterval = setInterval(() => {
        setDisplayedResult((prevResult) => prevResult + queryResult.charAt(i));
        i++;

        if (i === queryResult.length) {
          clearInterval(typingInterval);
        }
      }, 50);
    };

    if (queryResult !== "") {
      setDisplayedResult("");
      typeText();
    }
  }, [queryResult]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let sqlQuery =
      selectedSuggestion !== ""
        ? selectedSuggestion
        : (
            event.currentTarget.elements.namedItem(
              "sqlQuery"
            ) as HTMLTextAreaElement
          ).value;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `SQL query: ${sqlQuery}\nAnswer:`,
          max_tokens: 150,
          model: "text-davinci-003",
          temperature: 0.7,
          n: 1,
          stop: "\n",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      );

      const answer = response.data.choices[0].text.trim();
      setQueryResult(answer);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(queryResult);
    toast.success("Text copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-black"
      }`}
    >
      <ToastContainer position="top-center" />

      <button
        className={`fixed top-5 right-3 z-10 h-7 w-7 rounded-full bg-gray-200/70 fill-black/50 p-1.5 ${
          darkMode ? "bg-gray-800/30 fill-white/80" : ""
        }`}
        aria-label="Switch Theme"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FiSun className="h-4 w-4 text-white" />
        ) : (
          <FiMoon className="h-4 w-4 text-black" />
        )}
      </button>

      <main className="mx-auto mb-20 max-w-3xl px-10 pt-16 md:pt-20 lg:pt-28 font-Nunito">
        <div>
          <div className="flex h-full flex-col justify-center">
            <h1 className="-mb-3 text-center text-3xl">SQL AI</h1>
            <h3
              className={`mt-6 text-center text-lg font-light ${
                darkMode ? "text-white/80" : ""
              }`}
            >
              Find answers to your SQL queries <br />
              <span className="font-normal">with AI assistance 🤖💡</span>
            </h3>
            <form
              className="flex flex-col justify-center my-6"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="sqlQuery"
                className={`text-md text-gray-800 mb-2 font-medium ${
                  darkMode ? "text-white/90" : ""
                }`}
              >
                Ask your SQL question:
              </label>
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

              <button
                className={`mt-4 flex h-10 items-center justify-center rounded-md px-4 text-lg font-semibold text-white ${
                  darkMode ? "bg-black bg-black/50" : "bg-black"
                }`}
                type="submit"
              >
                Ask SQL AI
              </button>
            </form>
          </div>
          <p className={` -mb-2 ${darkMode ? "text-white/80" : ""}`}>
            Or, try one of these
          </p>
          <div className="overflow-x-scroll no-scrollbar flex flex-nowrap mb-6">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`mt-4 mr-2 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold text-gray-900 ${
                  darkMode
                    ? " bg-black/30 border-none text-white border-gray-100"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedSuggestion(suggestion);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div
            className={`relative rounded-lg border ${
              darkMode ? "border-gray-800" : "border-gray-300"
            } ${
              darkMode ? "bg-gray-800 bg-gray-800/50" : "bg-gray-100"
            } px-5 py-8`}
          >
            {displayedResult || "Your SQL query result will be displayed here."}
            <p
              className={`absolute text-sm bottom-2 right-8 ${
                darkMode ? "text-white/70" : ""
              }`}
            >
              - SQL AI 🤖
            </p>
            <button
              className={`absolute top-3 right-3 h-4 w-4 fill-gray-600 ${
                darkMode ? "fill-white" : ""
              }`}
              onClick={copyToClipboard}
            >
              <MdContentCopy />
            </button>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 text-center my-4 text-gray-500">
        Built with{" "}
        <SiReact className="inline-block align-text-bottom mx-1 text-[#087EA4]" />
        <SiTailwindcss className="inline-block align-text-bottom mx-1 text-teal-500" />
        {"and"}
        <AiTwotoneHeart className="inline-block align-text-bottom mx-1 text-green-500" />
        <a
          href="https://abhivarde.vercel.app"
          className={`${darkMode ? "text-white" : "text-black"}`}
        >
          AbhiVarde
        </a>
      </footer>
    </div>
  );
}

export default App;
