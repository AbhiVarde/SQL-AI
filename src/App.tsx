import { useState, FormEvent } from "react";
import axios from "axios";
import { FiMoon, FiSun } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [queryResult, setQueryResult] = useState("");

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sqlQuery = (
      event.currentTarget.elements.namedItem("sqlQuery") as HTMLTextAreaElement
    ).value;

    try {
      const makeRequest = async () => {
        const response = await axios.post(
          "https://api.openai.com/v1/completions",
          {
            prompt: `SQL query: ${sqlQuery}\nAnswer:`,
            max_tokens: 150,
            model: "text-davinci-003",
            temperature: 0,
            n: 1,
            top_p: 1,
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
      };

      const handleRateLimitError = (error: any) => {
        if (error.response && error.response.status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 1000;
          return new Promise((resolve) => setTimeout(resolve, waitTime)).then(
            makeRequest
          );
        }
        throw error;
      };

      await makeRequest().catch(handleRateLimitError);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <button
        className={`fixed top-5 right-3 z-10 h-7 w-7 rounded-full bg-gray-200/70 fill-black/50 p-1.5 ${
          darkMode ? "bg-gray-800/30 fill-white/80" : ""
        }`}
        aria-label="Switch Theme"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FiMoon className="h-4 w-4 text-white" />
        ) : (
          <FiSun className="h-4 w-4 text-black" />
        )}
      </button>
      <main className="mx-auto mb-20 max-w-3xl px-8 pt-12 md:pt-24 lg:pt-32 font-Nunito">
        <div>
          <div className="flex h-full flex-col justify-center">
            <h1 className="-mb-3 text-center text-3xl">SQL GPT</h1>
            <h3
              className={`mt-6 text-center text-lg font-light ${
                darkMode ? "text-white/80" : ""
              }`}
            >
              Find answers to your SQL queries <br />
              <span className="font-normal">with AI assistance</span>
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
                } ${darkMode ? "bg-gray-900 bg-gray-900/50" : "bg-gray-100"}`}
                name="sqlQuery"
                rows={2}
                required
              ></textarea>
              <button
                className={`mt-4 flex h-10 items-center justify-center rounded-md px-4 text-lg font-semibold text-white ${
                  darkMode ? "bg-gray-800 bg-gray-800/50" : "bg-gray-800"
                }`}
                type="submit"
              >
                Ask SQL AI
              </button>
            </form>
          </div>
          <div
            className={`relative mb-10 md:mb-20 rounded-lg border ${
              darkMode ? "border-gray-800" : "border-gray-300"
            } ${
              darkMode ? "bg-gray-900 bg-gray-900/50" : "bg-gray-100"
            } px-5 py-8`}
          >
            {queryResult || "Your SQL query result will be displayed here."}
            <p
              className={`absolute bottom-2 right-8 ${
                darkMode ? "text-white/70" : ""
              }`}
            >
              - SQL AI
            </p>
            <button
              className={`absolute top-3 right-3 h-4 w-4 fill-gray-600 ${
                darkMode ? "fill-white" : ""
              }`}
            >
              <MdContentCopy />
            </button>
          </div>
        </div>
      </main>
      <footer
        className={`fixed bottom-0 left-0 right-0 flex justify-center ${
          darkMode ? "bg-gray-800 bg-gray-800/50" : "bg-gray-800 text-white"
        } backdrop-blur-md py-2`}
      >
        Built with 💙 by{"  "}
        <span className={`px-1 underline decoration-dashed underline-offset-2`}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abhivarde.vercel.app"
            className={darkMode ? "text-white" : ""}
          >
            Abhi
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
