<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Retrieve user by ID
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
  $userId = $_GET['id'];
  $query = "SELECT * FROM users WHERE id_number = '$userId'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $response = [
      'success' => true,
      'data' => $user,
      'total' => 1
    ];
  } else {
    $response = [
      'success' => false,
      'message' => 'User not found.',
      'total' => 0
    ];
  }

  // Send response to client
  echo json_encode($response);
}

// Close database connection
$conn->close();

?>
