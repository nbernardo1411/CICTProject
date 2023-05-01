<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$password = $_POST['password'];

// Create connection to MySQL database
$conn = new mysqli('auth-db612.hstgr.io', 'u456146523_cmkis', 'Taelol12345@', 'u456146523_cict_schedule');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and bind statement to retrieve user with matching email
$stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
$stmt->bind_param('s', $email);

// Execute statement and store result
$stmt->execute();
$result = $stmt->get_result();

// Check if result has exactly one row
if ($result->num_rows === 1) {
  // Get user row
  $row = $result->fetch_assoc();

  // Verify password
  if (password_verify($password, $row['password'])) {
    // Password matches, generate and store auth token for user
    $authToken = bin2hex(random_bytes(32)); // generate 64-character hex string
    $userId = $row['id'];
    $stmt = $conn->prepare('INSERT INTO auth_tokens (user_id, token) VALUES (?, ?)');
    $stmt->bind_param('is', $userId, $authToken);
    $stmt->execute();
    $stmt->close();

    // Return success response with auth token and user data
    $response = [
      'success' => true,
      'message' => 'Login successful!',
      'user' => [
        'name' => $row['name'],
        'email' => $row['email'],
        'type' => $row['type'],
        'id_number' => $row['id_number'],
        'auth_token' => $authToken
      ]
    ];
  } else {
    // Password does not match, return error response
    $response = [
      'success' => false,
      'message' => 'Incorrect email or password.',
    ];
  }
} else {
  // Email not found, return error response
  $response = [
    'success' => false,
    'message' => 'Incorrect email or password.',
  ];
}

// Close database connection
$conn->close();

// Send response to client
echo json_encode($response);
?>
