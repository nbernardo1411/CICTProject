<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Retrieve all users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $query = "SELECT * FROM users";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $users = [];

    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }

    $response = [
      'success' => true,
      'data' => $users,
      'total' => count($users)
    ];
  } else {
    $response = [
      'success' => false,
      'message' => 'No users found.',
      'total' => 0
    ];
  }

  // Send response to client
  echo json_encode($response);
}

// Close database connection
$conn->close();

?>
