<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception("Database connection error");
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $input = file_get_contents("php://input");
        $data = json_decode($input);

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(array("message" => "Invalid JSON: " . json_last_error_msg()));
            exit;
        }

        if (empty($data->scooter_id)) {
            http_response_code(400);
            echo json_encode(array("message" => "Choose a scooter"));
            exit;
        }

        $query = "INSERT INTO rides (scooter_id, start_punkt, end_punkt, datum, zeit, duration, calculation_results, pricing_type, distance_km, pricing_id) 
                  VALUES (:scooter_id, :start_punkt, :end_punkt, :datum, :zeit, :duration, :calculation_results, :pricing_type, :distance_km, :pricing_id)";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":scooter_id", $data->scooter_id, PDO::PARAM_INT);
        $stmt->bindParam(":start_punkt", $data->start_punkt, PDO::PARAM_STR);
        $stmt->bindParam(":end_punkt", $data->end_punkt, PDO::PARAM_STR);
        $stmt->bindParam(":datum", date('Y-m-d'), PDO::PARAM_STR);
        $stmt->bindParam(":zeit", date('H:i:s'), PDO::PARAM_STR);
        $stmt->bindParam(":duration", $data->duration, PDO::PARAM_INT);
        $stmt->bindParam(":calculation_results", $data->total_cost, PDO::PARAM_STR);
        $stmt->bindParam(":pricing_type", $data->pricing_type, PDO::PARAM_STR);
        $stmt->bindParam(":distance_km", $data->distance_km, PDO::PARAM_STR);
        $stmt->bindParam(":pricing_id", $data->pricing_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $ride_id = $db->lastInsertId();

            $query = "SELECT r.*, s.scooter_number, p.price_per_km, p.price_per_minute, p.startingFee
              FROM rides r 
              LEFT JOIN scooters s ON r.scooter_id = s.id 
              LEFT JOIN pricing p ON r.pricing_id = p.id
              WHERE r.id = $ride_id";

            $result = $db->query($query);
            $rideData = $result->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            echo json_encode(array("message" => "Trip created", "ride_data" => $rideData));
        }
    } else {
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error: " . $e->getMessage()));
}
?>
