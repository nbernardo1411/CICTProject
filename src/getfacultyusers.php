<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and bind statement to select faculty names from the database
$stmt = $conn->prepare('SELECT DISTINCT faculty_name FROM schedules');
$stmt->execute();

// Bind result variable
$stmt->bind_result($facultyName);

// Fetch results and store them in an array
$facultyNames = [];
while ($stmt->fetch()) {
  $facultyNames[] = $facultyName;
}

// Close statement
$stmt->close();

// Send response to client
echo json_encode($facultyNames);

// Close database connection
$conn->close();
?>
