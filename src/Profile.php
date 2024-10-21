<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'myproject.local',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header('Content-Type: application/json');
error_log("Session ID at profile: " . session_id());
error_log("User session data: " . print_r($_SESSION, true));

if (!isset($_SESSION['user'])) {
    error_log("No session data found in profile.");
    $response = ['success' => false, 'message' => 'User not logged in.'];
} else {
    $user = $_SESSION['user'];
    error_log("User session data: " . print_r($user, true));
    
    $response = [
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
    ];
}


$jsonData = json_encode($response);
if ($jsonData === false) {
    error_log("JSON encoding error: " . json_last_error_msg());
    echo json_encode(['success' => false, 'message' => 'JSON encoding error']);
} else {
    error_log("Response JSON: " . $jsonData);
    echo $jsonData;
}

error_log("Profile.php reached");
?>
