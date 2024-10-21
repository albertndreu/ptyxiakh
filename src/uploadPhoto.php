<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];
        $imageHash = md5_file($image['tmp_name']); // Δημιουργία hash για την εικόνα
        $targetPath = __DIR__ . '/images/' . $imageHash;

        if (move_uploaded_file($image['tmp_name'], $targetPath)) {
            // Ενημέρωση της βάσης δεδομένων
            // Σύνδεση με τη βάση δεδομένων
            include('database_connection.php');
            session_start();
            $userId = $_SESSION['user']['ID'];

            $query = "UPDATE candidates SET IMAGEHASH = ? WHERE ID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param('si', $imageHash, $userId);
            $stmt->execute();

            echo json_encode(['success' => true, 'imageHash' => $imageHash]);
        } else {
            echo json_encode(['success' => false, 'message' => 'File upload failed.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
