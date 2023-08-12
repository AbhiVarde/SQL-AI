import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import DarkModeToggle from "./components/DarkModeToggle";
import QueryExplanation from "./components/QueryExplanation";
import QueryForm from "./components/QueryForm";
import QuerySuggestions from "./components/QuerySuggestions";
import QueryResult from "./components/QueryResult";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { AiTwotoneHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [queryResult, setQueryResult] = useState("");
  const [queryExplanation, setQueryExplanation] = useState("");
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
      const explanation = response.data.choices[0].explanation.trim();

      setQueryResult(answer);
      setQueryExplanation(explanation);
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
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <ToastContainer position="top-center" />

      <main className="mx-auto mb-20 max-w-3xl px-10 pt-16 md:pt-20 lg:pt-28 font-Nunito">
        <h1 className="-mb-3 text-center text-3xl">SQL AI</h1>

        <h3
          className={`mt-6 text-center text-lg font-light ${
            darkMode ? "text-white/80" : ""
          }`}
        >
          Find answers to your SQL queries <br />
          <span className="font-normal">with AI assistance 🤖💡</span>
        </h3>

        <QueryForm
          darkMode={darkMode}
          selectedSuggestion={selectedSuggestion}
          setSelectedSuggestion={setSelectedSuggestion}
          handleSubmit={handleSubmit}
        />

        <p className={`-mb-2 ${darkMode ? "text-white/80" : ""}`}>
          Or, try one of these
        </p>

        <QuerySuggestions
          suggestions={suggestions}
          darkMode={darkMode}
          setSelectedSuggestion={setSelectedSuggestion}
        />

        <QueryResult
          displayedResult={displayedResult}
          darkMode={darkMode}
          copyToClipboard={copyToClipboard}
        />

        <QueryExplanation explanation={queryExplanation} darkMode={darkMode} />
      </main>

      <footer
        className={`fixed bottom-0 left-0 right-0 text-center my-4 ${
          darkMode ? "text-gray-300" : "text-gray-400"
        }`}
      >
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
