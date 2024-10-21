<?php

//echo "PHP file loaded"; // For debugging, can be removed later

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include your database connection file
include('database_connection.php');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the JSON data from the request
    $input = json_decode(file_get_contents('php://input'), true);

    // Sanitize and retrieve form data
    $name = $input['name'];
    $fathersname = $input['fathersname'];
    $lastname = $input['lastname'];
    $imageHash = $input['imageHash'];
    $afm = $input['afm'];

    // Prepare your SQL query
    $query = "INSERT INTO candidates (name, fathersname, lastname, imageHash, afm) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    
    // Check if the statement was prepared correctly
    if ($stmt === false) {
        echo json_encode(['success' => false, 'error' => $conn->error]);
        exit;
    }

    // Bind parameters and execute
    $stmt->bind_param("ssssi", $name, $fathersname, $lastname, $imageHash, $afm);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Candidate registered successfully.']);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>