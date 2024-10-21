<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); // Προσθέστε αυτή τη γραμμή
header('Content-Type: application/json');
include('database_connection.php');
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = isset($input['name']) ? trim($input['name']) : '';
    $afm = isset($input['afm']) ? intval($input['afm']) : 0;

    if (empty($name) || empty($afm)) {
        echo json_encode(['success' => false, 'error' => 'Name and AFM are required']);
        exit;
    }

    $query = "SELECT * FROM candidates WHERE name = ? AND afm = ?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => 'Statement preparation failed.']);
        exit;
    }

    $stmt->bind_param("si", $name, $afm);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Αντί για session, επιστρέφουμε τα δεδομένα του χρήστη στο front-end
        echo json_encode([
            'success' => true,
            'user' => [
                'ID' => $user['ID'],
                'TOTALFILES' => $user['TOTALFILES'],
                'NAME' => $user['NAME'],
                'FATHERSNAME' => $user['FATHERSNAME'],
                'LASTNAME' => $user['LASTNAME'],
                'IMAGEHASH' => $user['IMAGEHASH'],
                'AFM' => $user['AFM'],
                'ADDRESS' => $user['ADDRESS']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
