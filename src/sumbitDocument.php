<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include('database_connection.php');

$target_dir = "uploads/"; // Φάκελος αποθήκευσης αρχείων
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$fileHash = hash_file('sha256', $_FILES["file"]["tmp_name"]); // Δημιουργία hash του αρχείου

// Έλεγχος αν το αρχείο υπάρχει ήδη
if (file_exists($target_file)) {
    echo json_encode(["success" => false, "message" => "File already exists."]);
    $uploadOk = 0;
}

// Έλεγχος μεγέθους αρχείου
if ($_FILES["file"]["size"] > 500000) {
    echo json_encode(["success" => false, "message" => "File is too large."]);
    $uploadOk = 0;
}

// Αν όλα είναι εντάξει, προχωράμε στην αποθήκευση του αρχείου
if ($uploadOk == 1) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $candidate_id = $_POST['candidate_id']; // Το ID του υποψήφιου
        $title = $_POST['title']; // Λήψη του τίτλου
        $description = $_POST['description']; // Λήψη της περιγραφής
        error_log("Candidate ID: " . $candidate_id); // Εγγραφή του candidate_id στο log

        // Έλεγχος αν το candidate_id υπάρχει
        $checkCandidate = $conn->prepare("SELECT ID FROM candidates WHERE ID = ?");
        $checkCandidate->bind_param("i", $candidate_id); // Χρησιμοποιεί τη μεταβλητή candidate_id
        $checkCandidate->execute();
        $result = $checkCandidate->get_result();

        if ($result->num_rows > 0) {
            // Το candidate_id υπάρχει
            $stmt = $conn->prepare("INSERT INTO files (candidate_id, filename, filehash, title, description, uploaded_at) VALUES (?, ?, ?, ?, ?, NOW())");
            
            // Φτιάχνουμε μεταβλητές για να περάσουμε στη bind_param
            $filename = basename($_FILES["file"]["name"]);
            $filehash = $fileHash;
            
            // Περνάμε τις μεταβλητές στη bind_param
            $stmt->bind_param("issss", $candidate_id, $filename, $filehash, $title, $description);

            if ($stmt->execute()) {
                // Επιστροφή μηνύματος επιτυχίας
                $response = [
                    'success' => true,
                    'message' => 'File uploaded successfully',
                    'filehash' => $fileHash // Επιστροφή του hash αν χρειάζεται
                ];
                echo json_encode($response);
            } else {
                echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "message" => "Candidate ID does not exist."]);
        }

        $checkCandidate->close();
    } else {
        echo json_encode(["success" => false, "message" => "File upload error."]);
    }
}
?>
