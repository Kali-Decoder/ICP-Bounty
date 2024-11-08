"use client";
import React from "react";
import { useDataContext } from "@/context/DataContext";
const HomePage = () => {
  const [name, setName] = React.useState("");
  const { submitName, greetNames } = useDataContext();

  const submitYourNameOnchain = async () => {
    if (!name) {
      alert("Please enter your name");
      return;
    }
    await submitName(name);
  };

  return (
    <>
      <main className="overflow-hidden">
        <div className="container p-20 mt-10">
          <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
            <h1 className="text-4xl font-bold text-blue-500 mb-4">ICP BIZZ</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full max-w-md">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={submitYourNameOnchain}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Greet
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-2">Submitted Names</h2>
              {greetNames.length > 0 ? (
                greetNames.map((name, index) => (
                  <p key={index} className="text-gray-500">
                    {name}
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No names submitted yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
