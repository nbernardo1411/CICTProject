<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
ob_start();
header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$password = $_POST['password'];



// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Debugging statement
error_log('Received email: ' . $email);

// Prepare and bind statement to retrieve user with matching email
$stmt = $conn->prepare('SELECT * FROM users WHERE email = ?');
$stmt->bind_param('s', $email);

// Execute statement and store result
$stmt->execute();
$result = $stmt->get_result();

// Debugging statement
error_log('Query result: ' . $result->num_rows . ' rows');

// Check if result has exactly one row
if ($result->num_rows === 1) {
  // Get user row
  $row = $result->fetch_assoc();

  // Verify password
  if (password_verify($password, $row['password'])) {
    // Password matches, return success response
    $response = [
      'success' => true,
      'message' => 'Login successful!',
      'user' => [
        'name' => $row['name'],
        'email' => $row['email'],
        'type' => $row['type'],
        'id_number' => $row['id_number']
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


// Close statement and database connection
$stmt->close();
$conn->close();

// Send response to client
echo json_encode($response);

?>
