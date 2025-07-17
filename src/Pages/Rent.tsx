import { useState } from "react";
import Logo from "../assets/logo.png";

export default function AboutUs() {
  const [method, setMethod] = useState<"minutes" | "kilometers">("minutes");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [openRide, setOpenRide] = useState(false);

  const unlockFee = 1; // Fixed unlock fee for all rides

  const calculatePrice = () => {
    if (method === "minutes") {
      setPrice(parseFloat(value) * 0.25 + unlockFee);
    } else {
      setPrice(parseFloat(value) * 0.75 + unlockFee);
    }
  };

  return (
    <div className="h-screen bg-white  place-content-center">
      <section className="relative  py-20 px-8   ">
        {/* Ride component start */}
        {openRide && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm  h-auto w-full flex justify-center ">
            <div className=" flex flex-col items-center justify-center mt-20 h-150 w-150 border-solid border-gray-300 rounded-lg shadow-lg p-6  bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl">
              <img
                src={Logo}
                alt="Scooteq Logo"
                className="h-40 w-auto object-contain mt-10 animate-bounce"
              />
              <h3 className="text-lime-300 text-5xl font-bold mt-auto">
                2.45 €
              </h3>
              <h1 className="text-5xl font-bold  text-white mt-auto">
                00:01:43
              </h1>
              <button
                type="button"
                className="w-100  text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-auto"
                onClick={() => setOpenRide(false)}
              >
                End Ride
              </button>
            </div>
          </div>
        )}

        {/* ride component end  */}

        <div className="absolute inset-0 w-full h-full -z-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="dots"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="rotate(45)"
              >
                <circle cx="10" cy="10" r="2" fill="#3B82F6" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="1440" height="800" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
            <img
              src={Logo}
              alt="About Us"
              className="relative rounded-xl  object-cover w-full h-full hover:opacity-90 transition-opacity duration-300"
            />
          </div>
          <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">
              Calculate Your Ride Cost
            </h1>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Choose pricing method:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="minutes"
                    checked={method === "minutes"}
                    onChange={() => setMethod("minutes")}
                  />
                  Per Minute
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="kilometers"
                    checked={method === "kilometers"}
                    onChange={() => setMethod("kilometers")}
                  />
                  Per Kilometer
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Enter {method === "minutes" ? "minutes" : "distance (km)"}:
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder={`Enter ${method === "minutes" ? "minutes" : "km"}`}
              />
            </div>

            <button
              onClick={() => {
                calculatePrice();
              }}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Calculate Price
            </button>

            <div className="h-16 mt-6 w-full ">
              {price !== null && (
                <h1 className="mt-6 text-lg font-medium text-green-600">
                  Total Price: €{price.toFixed(2)}
                </h1>
              )}
            </div>
            <div className="w-full h-16 ">
              {price !== null && (
                <button
                  className=" w-full focus:outline-none text-white bg-blue-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-xl px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-purple-700 dark:focus:ring-blue-900"
                  onClick={() => setOpenRide(true)}
                >
                  Start Ride
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
