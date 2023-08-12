import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import DarkModeToggle from "./components/DarkModeToggle";
import QueryForm from "./components/QueryForm";
import QuerySuggestions from "./components/QuerySuggestions";
import QueryResult from "./components/QueryResult";
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
        if (i === queryExplanation.length) {
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

      <main className="mx-auto mb-20 max-w-3xl px-4 sm:px-6  md:px-12 lg:px-16 pt-20 lg:pt-24 font-Nunito">
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
      </main>

      <footer
        className={`fixed bottom-0 left-0 right-0 text-center my-4 ${
          darkMode ? "text-gray-300" : "text-black/60"
        }`}
      >
        Built by{" "}
        <a
          href="https://abhivarde.vercel.app"
          className={`${darkMode ? "text-white" : "text-black"} `}
        >
          AbhiVarde
        </a>
        . Made for people of the internet.
      </footer>
    </div>
  );
}

export default App;
