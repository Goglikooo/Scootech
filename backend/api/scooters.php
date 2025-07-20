<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $query = "SELECT s.id, s.scooter_number, s.pricing_id, p.price_per_km, p.price_per_minute, p.startingFee 
          FROM scooters s 
          LEFT JOIN pricing p ON s.pricing_id = p.id 
          ORDER BY s.scooter_number";

        $stmt = $db->prepare($query);
        $stmt->execute();

        $scooters = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $scooters[] = $row;
        }

        http_response_code(200);
        echo json_encode(array("scooters" => $scooters));
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Error: " . $e->getMessage()));
    }
}
?>
