<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and bind statement to select faculty users from the database
$stmt = $conn->prepare('SELECT name FROM users WHERE type = "faculty"');
$stmt->execute();

// Bind result variables
$stmt->bind_result($name);

// Fetch results and store them in an array
$faculty_users = [];
while ($stmt->fetch()) {
  $faculty_users[] = $name;
}

// Close statement
$stmt->close();

// Send response to client
echo json_encode($faculty_users);

// Close database connection
$conn->close();

?>
