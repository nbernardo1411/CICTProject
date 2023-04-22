<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$schedule = json_encode($data['schedule']);

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and bind statement to insert schedule into the database
$stmt = $conn->prepare('INSERT INTO schedules (faculty_name, schedule_data) VALUES (?, ?)');
$stmt->bind_param('ss', $name, $schedule);

// Execute statement and check for errors
if ($stmt->execute()) {
  $response = [
    'success' => true,
    'message' => 'Schedule assigned successfully!',
  ];
} else {
  $response = [
    'success' => false,
    'message' => 'An error occurred while assigning schedule. Please try again later.',
  ];
}

// Close statement and database connection
$stmt->close();
$conn->close();

// Send response to client
echo json_encode($response);

?>
