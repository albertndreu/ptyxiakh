<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


// Include your database connection file
include('database_connection.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and retrieve form data

    $input = json_decode(file_get_contents('php://input'), true);


    $name = $_POST['name'];
    $fathersname = $_POST['fathersname'];
    $lastname = $_POST['lastname'];
    $imageHash = $_POST['imageHash'];
    $afm = $_POST['afm'];

    // Prepare your SQL query
    $query = "INSERT INTO candidates (name, fathersname, lastname, imageHash, afm) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssi", $name, $fathersname, $lastname, $imageHash, $afm);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Candidate registered successfully.']);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
    $stmt->close();
}
?>
