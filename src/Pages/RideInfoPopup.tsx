interface RideInfo {
    id: number;
    scooter_number: string;
    start_punkt: string;
    end_punkt: string;
    datum: string;
    zeit: string;
    duration: number;
    calculation_results: number;
    pricing_type: string;
    distance_km: number;
    price_per_km: number;
    price_per_minute: number;
    startingFee: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    rideInfo: RideInfo | null;
}

export default function RideInfoPopup({ isOpen, onClose, rideInfo }: Props) {
    if (!isOpen || !rideInfo) return null;

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const currentPrice = Number(rideInfo.pricing_type === 'per_minute' ? rideInfo.price_per_minute : rideInfo.price_per_km);

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm h-auto w-full flex justify-center items-center">
            <div className="flex flex-col max-w-md w-full mx-4 bg-white rounded-xl shadow-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                    ×
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">🛴Trip Information</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded"></div>
                </div>

                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Scooter:</h3>
                    <p className="text-gray-600">Number: {rideInfo.scooter_number}</p>
                </div>

                <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2"> Route: </h3>
                    <p className="text-gray-600"> From:  {rideInfo.start_punkt}</p>
                    <p className="text-gray-600"> To:  {rideInfo.end_punkt}</p>
                </div>

                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2"> Trip Details: </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-600"> Date:  {rideInfo.datum}</p>
                        <p className="text-gray-600"> Time:  {rideInfo.zeit}</p>
                        <p className="text-gray-600"> Duration:  {formatTime(rideInfo.duration)}</p>
                        <p className="text-gray-600"> Seconds:  {rideInfo.duration}s</p>
                    </div>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2"> Cost: </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <p className="text-gray-600"> Rate:  €{currentPrice}</p>
                        <p className="text-gray-600"> Type:  {rideInfo.pricing_type === 'per_minute' ? 'Per minute' : 'Per km'}</p>
                        {rideInfo.distance_km > 0 && (
                            <p className="text-gray-600"> Distance:  {rideInfo.distance_km} km</p>
                        )}
                        <p className="text-gray-600">Starting Fee: €{rideInfo.startingFee}</p>
                        <p className="text-lg font-bold text-green-600"> Total: €{Number(rideInfo.calculation_results).toFixed(2)}</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
