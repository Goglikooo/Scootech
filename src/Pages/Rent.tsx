import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

import Stopwatch from "../components/Stopwatch";


interface Scooter {
  id: number;
  scooter_number: string;
  price_per_km: number;
  price_per_minute: number;
  pricing_id: number;
  startingFee: number;
}

interface Props {
  setOpenRide: React.Dispatch<React.SetStateAction<boolean>>;
  openRide: boolean;
}

  export default function AboutUs({ setOpenRide, openRide }: Props) {
  const [method, setMethod] = useState<"minutes" | "kilometers">("minutes");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState<number | null>(null);

    const [scooters, setScooters] = useState<Scooter[]>([]);
    const [selectedScooter, setSelectedScooter] = useState<number | null>(null);
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");

    const selectedScooterData = scooters.find(s => s.id === selectedScooter) || null;

  useEffect(() => {
    fetchScooters();
  }, []);

    const fetchScooters = async () => {
      try {
        const response = await fetch('http://localhost/scootech/backend/api/scooters.php');
        const data = await response.json();
        console.log('Loaded scooters:', data);
        setScooters(data.scooters || []);
      } catch (error) {
        console.error('Scooter loading error:', error);
      }
    };

    const calculatePrice = () => {
      if (!selectedScooterData) {
        alert('Choose a scooter');
        return;
      }

      if (!value || parseFloat(value) <= 0) {
        alert('Enter a valid number');
        return;
      }

      const pricePerMinute = Number(selectedScooterData.price_per_minute);
      const pricePerKm = Number(selectedScooterData.price_per_km);
      const startFee = Number(selectedScooterData.startingFee);
      const inputValue = Number(value);

      let calculatedPrice: number;

      if (method === "minutes") {
        calculatedPrice = inputValue * pricePerMinute + startFee;
      } else {
        calculatedPrice = inputValue * pricePerKm + startFee;
      }

      if (isNaN(calculatedPrice)) {
        alert('Error calculating price');
        return;
      }

      setPrice(calculatedPrice);
    };


  return (
    <div className="h-screen bg-white  place-content-center">
      <section className="relative  py-20 px-8   ">
        {/* Ride component start */}
        {openRide && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm  h-auto w-full flex justify-center ">
            <div className=" flex flex-col items-center justify-center mt-20 h-150 w-150 border-solid border-gray-300 rounded-lg shadow-lg p-6  bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl">
              <Stopwatch
                  setOpenRide={setOpenRide}
                  selectedScooter={selectedScooter}
                  startPoint={startPoint}
                  endPoint={endPoint}
                  method={method}
                  distance={parseFloat(value) || 0}
                  selectedScooterData={selectedScooterData || null}
              />
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
              <label className="block text-gray-700 mb-2">Choose a scooter:</label>
              <select
                  value={selectedScooter || ''}
                  onChange={(e) => setSelectedScooter(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="">Choose a scooter</option>
                {scooters.map(scooter => (
                    <option key={scooter.id} value={scooter.id}>
                      {scooter.scooter_number} - (€{scooter.price_per_minute}/min, €{scooter.price_per_km}/km)
                    </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Starting point:</label>
              <input
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="From where"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Endpoint:</label>
              <input
                  type="text"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="Where to"
              />
            </div>


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
               {price && price > 0 && (
                <h1 className="mt-6 text-lg font-medium text-green-600">
                  Estimated Total Price: €{price.toFixed(2)}
                </h1>
              )}
            </div>
            <div className="w-full h-16 ">
               {price && price > 0 && (
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
