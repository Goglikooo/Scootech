import { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.png";

export default function Stopwatch({
  setOpenRide,
}: {
  setOpenRide: (open: boolean) => void;
}) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  const [time, setTime] = useState<number>(0); // stores the time difference

  const [isRunning, setIsRunning] = useState(false);
  const [openPay, setOpenPay] = useState(false); // state to control payment
  const startingFee = 1.0; // Fixed unlock fee for all rides
  const perSecondRate = 0.25 / 60; // 0.25€ per minute, so per second it's 0.25/60

  const hours = Math.floor(time / hour);
  const minutes = Math.floor((time / minute) % 60);
  const seconds = Math.floor((time / second) % 60);

  const startTimeRef = useRef<number>(0);

  const [totalCost, setTotalCost] = useState<number>(startingFee);

  const start = () => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
    setOpenPay(true);
  };

  //timer + fare useEffect

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        setTime(elapsedTime);

        const cost = startingFee + (elapsedTime / second) * perSecondRate;
        setTotalCost(parseFloat(cost.toFixed(4)));
      }, 50);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const [openBanner, setOpenBanner] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative">
      {/* banner start */}

      {openBanner && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
          role="alert"
        >
          <svg
            className="shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Payment Successful!</span>
          </div>
        </div>
      )}

      {/* banner end  */}
      {!isRunning && (
        <svg
          className="h-6 w-6 absolute top-2 right-2 cursor-pointer text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          onClick={() => setOpenRide(false)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}

      <img
        src={Logo}
        alt="Scooteq Logo"
        className={`h-40 w-auto object-contain mt-10  ${
          isRunning ? "animate-bounce" : ""
        }`}
      />
      <h3 className="text-lime-300 text-5xl font-bold mt-auto">
        {totalCost.toFixed(2)}€
      </h3>
      <h1 className="text-5xl font-bold  text-white mt-auto">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>

      <button
        type="button"
        className={`w-100  mt-auto  
          ${
            isRunning
              ? "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              : "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          }
            `}
        // onClick={isRunning ? stop : start}
        onClick={() => {
          if (!isRunning && !openPay) {
            start();
          }

          if (isRunning) {
            stop();
          }

          if (openPay) {
            // setOpenRide(false);

            setOpenPay(false);
            setOpenBanner(true);
            console.log("Payment initiated", { totalCost, time }); // Here you can handle the payment logic
            console.log({ hours }); // Here you can handle the payment logic
          }
        }}
      >
        {!isRunning && !openPay && "Start Trip"}
        {isRunning && "End Trip"}
        {openPay && "Pay Now"}
      </button>
    </div>
  );
}
