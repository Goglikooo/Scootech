import { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo.png";
import RideInfoPopup from "../Pages/RideInfoPopup";

interface Scooter {
    id: number;
    scooter_number: string;
    pricing_id: number;
    price_per_km: number;
    price_per_minute: number;
    startingFee: number;
}

interface Props {
    setOpenRide: (open: boolean) => void;
    selectedScooter: number | null;
    startPoint: string;
    endPoint: string;
    method: "minutes" | "kilometers";
    distance: number;
    selectedScooterData: Scooter | null;
}

export default function Stopwatch({
                                      setOpenRide,
                                      selectedScooter,
                                      startPoint,
                                      endPoint,
                                      method,
                                      distance,
                                      selectedScooterData
                                  }: Props) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;

    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showReceiptButton, setShowReceiptButton] = useState(false);
    const [paymentNeed, setPaymentNeed] = useState(false);
    const [showRideInfo, setShowRideInfo] = useState(false);
    const [rideInfo, setRideInfo] = useState(null);

    const startingFee = Number(selectedScooterData?.startingFee || 1);
    const perSecondRate = Number(selectedScooterData?.price_per_minute || 0.25) / 60;

    const hours = Math.floor(time / hour);
    const minutes = Math.floor((time / minute) % 60);
    const seconds = Math.floor((time / second) % 60);

    const startTimeRef = useRef<number>(0);
    const [totalCost, setTotalCost] = useState<number>(Number(startingFee));

    const start = () => {
        startTimeRef.current = Date.now();
        setIsRunning(true);
    };

    const stop = () => {
        setIsRunning(false);
        setShowReceiptButton(true);
    };

    useEffect(() => {
        let intervalId: number | undefined;
        if (isRunning) {
            intervalId = setInterval(() => {
                const elapsedTime = Date.now() - startTimeRef.current;
                setTime(elapsedTime);
                const cost = startingFee + (elapsedTime / second) * perSecondRate;
                setTotalCost(Number(cost.toFixed(4)));
            }, 50);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, perSecondRate, startingFee]);


    const saveRideAndShowReceipt = async () => {
        try {
            const rideData = {
                scooter_id: selectedScooter,
                start_punkt: startPoint,
                end_punkt: endPoint,
                duration: Math.floor(time / second),
                total_cost: Number(totalCost),
                pricing_type: method === "minutes" ? "per_minute" : "per_km",
                distance_km: method === "kilometers" ? distance : 0,
                pricing_id: selectedScooterData?.pricing_id || 1
            };

            const response = await fetch('http://localhost/scootech/backend/api/rides.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rideData)
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                return;
            }

            const result = await response.json();

            if (response.ok && result.ride_data) {
                setRideInfo(result.ride_data);
                setShowReceiptButton(false);
                setPaymentNeed(false);
                setShowRideInfo(true);
            } else {
                throw new Error(result.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error saving trip:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative">
            <RideInfoPopup
                isOpen={showRideInfo}
                onClose={() => {
                    setShowRideInfo(false);
                    setOpenRide(false);
                    window.location.reload();
                }}
                rideInfo={rideInfo}
            />

            {paymentNeed && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">You have not paid yet!</span>
                </div>
            )}

            {!isRunning && !showReceiptButton && !showRideInfo && (
                <svg
                    className="h-6 w-6 absolute top-2 right-2 cursor-pointer text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                        setPaymentNeed(true);
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}

            <img
                src={Logo}
                alt="Scooteq Logo"
                className={`h-40 w-auto object-contain mt-10 ${isRunning ? "animate-bounce" : ""}`}
            />

            <h3 className="text-lime-300 text-5xl font-bold mt-auto">
                {typeof totalCost === 'number' && !isNaN(totalCost) ? totalCost.toFixed(2) : '0.00'}€
            </h3>

            <h1 className="text-5xl font-bold text-white mt-auto">
                {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </h1>

            {!showRideInfo && (
                <button
                    type="button"
                    className={`w-100 mt-auto ${
                        isRunning
                            ? "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            : showReceiptButton
                                ? "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                : "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    }`}
                    onClick={() => {
                        if (!isRunning && !showReceiptButton) {
                            start();
                        } else if (isRunning) {
                            stop();
                        } else if (showReceiptButton) {
                            saveRideAndShowReceipt();
                        }
                    }}
                >
                    {!isRunning && !showReceiptButton && "Start Trip"}
                    {isRunning && "End Trip"}
                    {showReceiptButton && "View Receipt"}
                </button>
            )}
        </div>
    );
}
